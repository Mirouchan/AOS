import pika
import json
import os
import django
from django.core.management.base import BaseCommand

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'notification_service.settings')
django.setup()

from notifications.models import Notification

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT', 5672))
RABBITMQ_EXCHANGE = os.getenv('RABBITMQ_EXCHANGE', 'notifications_exchange')

def normalize_event(event):
    """Normalize event names from different formats"""
    event_mapping = {
        'order_created': 'order.created',        
        'USER_CREATED': 'user.created',
        'order_confirmed': 'order.confirmed',
        'booking_created': 'booking.created',
        'booking_confirmed': 'booking.confirmed',     
    }
    return event_mapping.get(event, event)

def extract_user_id(message):
    """Extract user_id from different message formats"""
    # Standard format: {"user_id": 123}
    if 'user_id' in message:
        return message['user_id']
    # Format: {"id": 123}
    if 'id' in message:
        return message['id']
    # Format: {"data": {"user_id": 123}}
    if 'data' and 'user_id' in message.get('data', {}):
        return message['data']['user_id']
    return None

def extract_data(message, event):
    """Extract data from different message formats"""
    data = message.get('data', {})
    
    # If data is directly in the message (not in 'data')
    if 'order_id' in message and 'user_id' in message:
        data = {
            'order_id': message.get('order_id'),
            'total_price': message.get('total_price'),
            'user_id': message.get('user_id')
        }
    
    # For USER_CREATED event
    if 'username' in message and 'email' in message:
        data = {
            'username': message.get('username'),
            'email': message.get('email'),
            'user_id': message.get('id')
        }
    
    return data

def generate_notification_text(event, data):
    messages = {
        'order.created': f"🛒 New order #{data.get('order_id', '')} created for {data.get('total_price', 0)} DA",
        'order.confirmed': f"✅ Your order #{data.get('order_id', '')} has been confirmed",
        'booking.created': f"✈️ Your booking to {data.get('destination', '')} is pending review",
        'booking.confirmed': f"🎉 Your booking to {data.get('destination', '')} has been confirmed",
        'user.created': f"🎉 Welcome {data.get('username', '')} to TerraVentures!",
    }
    return messages.get(event, f"📢 New notification: {event}")

def process_message(ch, method, properties, body):
    try:
        message = json.loads(body)
        print(f"📩 Received raw: {message}")
        
        # Get original event
        original_event = message.get('event') or message.get('event_type')
        if not original_event:
            print("⚠️ Message without event")
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return
        
        # Normalize event
        event = normalize_event(original_event)
        print(f"📩 Normalized event: {event}")
        
        # Extract user_id
        user_id = extract_user_id(message)
        if not user_id:
            print("⚠️ Message without user_id")
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return
        
        # Extract data
        data = extract_data(message, event)
        
        # Generate notification text
        text = generate_notification_text(event, data)
        
        # Save to database
        Notification.objects.create(
            user_id=user_id, 
            content=text, 
            event_type=event
        )
        
        print(f"✅ Notification created for user {user_id}")
        ch.basic_ack(delivery_tag=method.delivery_tag)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag)

class Command(BaseCommand):
    help = 'Consume RabbitMQ messages'

    def handle(self, *args, **options):
        self.stdout.write("🚀 Starting RabbitMQ Consumer...")
        
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT)
            )
            channel = connection.channel()
            
            channel.exchange_declare(exchange=RABBITMQ_EXCHANGE, exchange_type='topic', durable=True)
            result = channel.queue_declare('', exclusive=True)
            queue_name = result.method.queue
            
            # Listen to multiple events
            events = [
                'order.created', 'order.confirmed', 'order_created',
                'booking.created', 'booking.confirmed',
                'user.created', 'USER_CREATED'
            ]
            
            for event in events:
                channel.queue_bind(exchange=RABBITMQ_EXCHANGE, queue=queue_name, routing_key=event)
            
            channel.basic_consume(queue=queue_name, on_message_callback=process_message, auto_ack=False)
            
            self.stdout.write(self.style.SUCCESS(f"✅ Connected to RabbitMQ"))
            self.stdout.write("👂 Waiting for messages...")
            channel.start_consuming()
            
        except KeyboardInterrupt:
            self.stdout.write("\n🛑 Stopped")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error: {e}"))
