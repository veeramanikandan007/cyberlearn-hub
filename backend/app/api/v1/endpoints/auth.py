import logging

import psycopg
from fastapi import APIRouter, HTTPException, status
from psycopg.errors import UniqueViolation

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.schemas import TokenResponse, UserLogin, UserRegister

router = APIRouter()
logger = logging.getLogger(__name__)


def ensure_auth_configuration() -> None:
    if not settings.DATABASE_URL:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Account database is not configured.",
        )
    if not settings.SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication token signing is not configured.",
        )


def ensure_user_table(connection: psycopg.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS cyberlearn_users (
            email TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'student',
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )


@router.post("/login", response_model=TokenResponse, summary="User Authentication Login")
def login(credentials: UserLogin):
    ensure_auth_configuration()
    try:
        with psycopg.connect(settings.DATABASE_URL) as connection:
            ensure_user_table(connection)
            user = connection.execute(
                """
                SELECT email, name, password_hash, role
                FROM cyberlearn_users
                WHERE email = %s
                """,
                (credentials.email,),
            ).fetchone()
    except psycopg.Error as error:
        logger.exception("Unable to access the account database.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Account database is unavailable.",
        ) from error

    if not user or not verify_password(credentials.password, user[2]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    access_token = create_access_token(subject=user[0])
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user[0],
            "name": user[1],
            "role": user[3],
        }
    }


@router.post("/register", response_model=TokenResponse, summary="User Registration")
def register(user_data: UserRegister):
    ensure_auth_configuration()
    password_hash = get_password_hash(user_data.password)
    try:
        with psycopg.connect(settings.DATABASE_URL) as connection:
            ensure_user_table(connection)
            connection.execute(
                """
                INSERT INTO cyberlearn_users (email, name, password_hash)
                VALUES (%s, %s, %s)
                """,
                (user_data.email, user_data.name, password_hash),
            )
    except UniqueViolation as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists.",
        ) from error
    except psycopg.Error as error:
        logger.exception("Unable to access the account database.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Account database is unavailable.",
        ) from error

    access_token = create_access_token(subject=user_data.email)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user_data.email,
            "name": user_data.name,
            "role": "student",
        },
    }
