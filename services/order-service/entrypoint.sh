#!/bin/sh

echo "Waiting for DB..."

until nc -z order-db 3306; do
  sleep 2
done

echo "DB ready"

python manage.py migrate
exec python manage.py runserver 0.0.0.0:8000