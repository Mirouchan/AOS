import requests
import os
import time

CONSUL_HOST = os.getenv("CONSUL_HOST", "consul")
CONSUL_PORT = 8500

SERVICE_NAME = os.getenv("SERVICE_NAME", "auth-service")
SERVICE_PORT = int(os.getenv("SERVICE_PORT", 8000))
SERVICE_HOST = os.getenv("SERVICE_HOST",SERVICE_NAME)

def register_service():
    url = f"http://{CONSUL_HOST}:{CONSUL_PORT}/v1/agent/service/register"

    payload = {
        "Name": SERVICE_NAME,
        "ID": f"{SERVICE_NAME}-{SERVICE_PORT}",
        "Address": SERVICE_HOST,
        "Port": SERVICE_PORT,
        "Check": {
            "HTTP": f"http://{SERVICE_HOST}:{SERVICE_PORT}/health",
            "Interval": "10s",
            "Timeout": "5s",
             "DeregisterCriticalServiceAfter": "1m"
        }
    }

    try:
        response = requests.put(url, json=payload)
        print("✅ Registered:", response.status_code)
    except Exception as e:
        print("❌ Error registering service:", e)

if __name__ == "__main__":
    # ننتظر شويه باش Consul يطلع
    time.sleep(10)
    register_service()