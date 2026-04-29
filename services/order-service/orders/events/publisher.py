import pika
import json

def publish_event(queue, data):
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="rabbitmq")
        )
        channel = connection.channel()
        channel.queue_declare(queue=queue, durable=True)

        channel.basic_publish(
            exchange="",
            routing_key=queue,
            body=json.dumps(data),
            properties=pika.BasicProperties(delivery_mode=2)  # persistent
        )

        print(f"Event published to {queue}: {data}")

    except pika.exceptions.AMQPConnectionError as e:
        print(f"Error connecting to RabbitMQ: {e}")

    finally:
        if 'connection' in locals() and connection.is_open:
            connection.close()