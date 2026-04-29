import consul

def register_service():
    try:
        client = consul.Consul(host='127.0.0.1', port=8500)

        client.agent.service.register(
            name='notification-service',
            service_id='notification-service-1',
            address='host.docker.internal',
            port=8000,
            tags=['django', 'notification', 'microservice'],
            check=consul.Check.http(
                'http://host.docker.internal:8000/api/health',
                interval='10s',
                timeout='5s'
            )
        )

        print("✅ Service enregistré dans Consul")
        return True

    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

if __name__ == "__main__":
    register_service()