import os
import time
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

try:
    import docker
    docker_available = True
except ImportError:
    docker_available = False

class LabOrchestrator:
    def __init__(self):
        self.active_sessions: Dict[str, Dict[str, Any]] = {}
        if docker_available:
            try:
                self.client = docker.from_env()
            except Exception:
                self.client = None
        else:
            self.client = None

    def launch_lab(self, user_id: str, lab_id: str, image_name: str = "vulnerable-web-target:latest") -> Dict[str, Any]:
        session_key = f"{user_id}_{lab_id}"
        expires_at = (datetime.utcnow() + timedelta(minutes=60)).isoformat()

        if self.client:
            container_name = f"cyberlearn-{user_id[:6]}-{lab_id[:8]}"
            network_name = f"net-{user_id[:6]}"

            # Ensure user isolation bridge network exists
            try:
                network = self.client.networks.get(network_name)
            except Exception:
                network = self.client.networks.create(network_name, driver="bridge", internal=True)

            # Teardown existing container if running
            try:
                existing = self.client.containers.get(container_name)
                existing.stop()
                existing.remove()
            except Exception:
                pass

            # Run target vulnerable container
            try:
                container = self.client.containers.run(
                    image=image_name,
                    name=container_name,
                    detach=True,
                    mem_limit="512m",
                    network=network_name,
                    labels={"user_id": user_id, "lab_id": lab_id}
                )
                container.reload()
                target_ip = container.attrs["NetworkSettings"]["Networks"][network_name]["IPAddress"]
                container_id = container.id
            except Exception as e:
                # Fallback to simulated local lab environment if docker daemon is absent
                target_ip = "10.10.14.88"
                container_id = f"sim-{user_id[:8]}"
        else:
            target_ip = "10.10.14.88"
            container_id = f"sim-{user_id[:8]}"

        session_data = {
            "session_id": container_id,
            "user_id": user_id,
            "lab_id": lab_id,
            "target_ip": target_ip,
            "status": "RUNNING",
            "expires_at": expires_at,
            "created_at": datetime.utcnow().isoformat()
        }

        self.active_sessions[session_key] = session_data
        return session_data

    def terminate_lab(self, user_id: str, lab_id: str) -> bool:
        session_key = f"{user_id}_{lab_id}"
        session = self.active_sessions.pop(session_key, None)

        if self.client and session and session["session_id"].startswith("sim-") is False:
            try:
                container = self.client.containers.get(session["session_id"])
                container.stop()
                container.remove()
            except Exception:
                pass
        return True

    def get_session(self, user_id: str, lab_id: str) -> Optional[Dict[str, Any]]:
        return self.active_sessions.get(f"{user_id}_{lab_id}")

orchestrator = LabOrchestrator()
