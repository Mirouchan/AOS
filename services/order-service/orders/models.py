import uuid
from django.db import models


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user_id = models.IntegerField()  # from Auth Service

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total_price(self):
        return sum(item.price * item.quantity for item in self.items.all())

    def __str__(self):
        return f"Order {self.id} by User {self.user_id}"


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    order = models.ForeignKey(
        Order,
        related_name='items',
        on_delete=models.CASCADE
    )

    product_id = models.IntegerField()  # from Product Service

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )  # snapshot price

    def get_total(self):
        return self.price * self.quantity

    def __str__(self):
        return f"Product {self.product_id} x {self.quantity}"