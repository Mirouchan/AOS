#!/bin/bash

echo "Waiting for DB..."

until nc -z notification-db 3306; do
  sleep 2
done

echo "DB ready"

# انتظر RabbitMQ
echo "Waiting for RabbitMQ..."
while ! nc -z rabbitmq 5672; do
    sleep 2
done
echo "RabbitMQ is ready!"

# نفذ التهاجيرات
python manage.py migrate
python consul_register.py &
# ابدأ التطبيق
python manage.py runserver 0.0.0.0:8000