import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.orchestrator import orchestrator

router = APIRouter()

@router.websocket("/ws/shell/{session_id}")
async def websocket_shell(websocket: WebSocket, session_id: str):
    await websocket.accept()
    await websocket.send_text("\r\n\x1b[32m[+] CyberLearn Hub Attacker Shell Session Established v1.0\x1b[0m\r\n")
    await websocket.send_text("\x1b[34m[i] Target Container ID: " + session_id + "\x1b[0m\r\n\r\n")
    await websocket.send_text("root@cyberlearn-box:~# ")

    try:
        while True:
            data = await websocket.receive_text()
            if not data:
                continue
            
            # Simple interactive shell echo simulation or pty bridge
            if data in ["\r", "\n"]:
                await websocket.send_text("\r\nroot@cyberlearn-box:~# ")
            elif data == "\x03": # Ctrl+C
                await websocket.send_text("^C\r\nroot@cyberlearn-box:~# ")
            else:
                # Echo user input back to terminal window
                await websocket.send_text(data)
    except WebSocketDisconnect:
        pass
