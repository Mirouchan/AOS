#!/bin/bash

# انتظر MySQL
echo "Waiting for notification-db..."
while ! mysqladmin ping -h "notification-db" -uroot -proot --silent; do
    sleep 2
done
echo "notification-db is ready!"

# انتظر RabbitMQ
echo "Waiting for RabbitMQ..."
while ! nc -z rabbitmq 5672; do
    sleep 2
done
echo "RabbitMQ is ready!"

# نفذ التهاجيرات
python manage.py migrate

# ابدأ التطبيق
python manage.py runserver 0.0.0.0:8000