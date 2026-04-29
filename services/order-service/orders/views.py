import requests
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer, CreateOrderItemSerializer


# =========================
# 🔐 Helper
# =========================
def get_user_id(request):
    return request.headers.get("X-User-Id")


# =========================
# 🔥 Create Order
# =========================
class CreateOrderView(APIView):

    def post(self, request):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        items_data = request.data.get("items", [])

        if not items_data:
            return Response({"error": "No items provided"}, status=400)

        serializer = CreateOrderItemSerializer(data=items_data, many=True)
        serializer.is_valid(raise_exception=True)
        items = serializer.validated_data

        product_ids = [item["product_id"] for item in items]

        try:
            res = requests.post(
                "http://product-service:8002/api/products/bulk/",
                json={"ids": product_ids},
                headers={
                    "Authorization": request.headers.get("Authorization")
                },
                timeout=5
            )

            if res.status_code != 200:
                return Response({"error": "Product service error"}, status=500)

            products = res.json()

        except requests.exceptions.RequestException:
            return Response({"error": "Product service unavailable"}, status=500)

        products_dict = {p["id"]: p for p in products}

        missing = [pid for pid in product_ids if pid not in products_dict]
        if missing:
            return Response(
                {"error": f"Products not found: {missing}"},
                status=400
            )

        with transaction.atomic():
            order = Order.objects.create(user_id=user_id)

            for item in items:
                product = products_dict[item["product_id"]]

                OrderItem.objects.create(
                    order=order,
                    product_id=product["id"],
                    quantity=item["quantity"],
                    price=product["price"]
                )

        return Response({
            "message": "Order created",
            "order_id": str(order.id)
        }, status=201)


# =========================
# 📦 My Orders
# =========================
class MyOrdersView(APIView):

    def get(self, request):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        orders = Order.objects.filter(user_id=user_id)

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


# =========================
# 🔍 Order Detail
# =========================
class OrderDetailView(APIView):

    def get_object(self, pk, user_id):
        return get_object_or_404(Order, pk=pk, user_id=user_id)

    # ---------------------
    def get(self, request, pk):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        order = self.get_object(pk, user_id)

        serializer = OrderSerializer(order)
        return Response(serializer.data)

    # ---------------------
    def patch(self, request, pk):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        order = self.get_object(pk, user_id)

        status_value = request.data.get("status")

        if status_value:
            order.status = status_value
            order.save()

        return Response({"message": "Order updated"})

    # ---------------------
    def delete(self, request, pk):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        order = self.get_object(pk, user_id)

        if order.status != "pending":
            return Response({"error": "Cannot delete this order"}, status=400)

        order.delete()
        return Response(status=204)