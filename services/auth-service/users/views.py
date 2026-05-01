from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import User
from .serializers import RegisterSerializer


# =========================
# 🔥 USER LIST (ADMIN ONLY)
# =========================
class UserListView(APIView):

    def get(self, request):

        if not getattr(request, "is_admin", False):
            return Response({"error": "Forbidden"}, status=403)

        users = User.objects.all()
        serializer = RegisterSerializer(users, many=True)
        return Response(serializer.data)


# =========================
# 🔥 USER DETAIL
# =========================
class UserDetailView(APIView):

    # ---------------------
    # GET USER
    # ---------------------
    def get(self, request, pk):

        if not request.user_id:
            return Response({"error": "Unauthorized"}, status=401)

        user = get_object_or_404(User, pk=pk)
        serializer = RegisterSerializer(user)
        return Response(serializer.data)


    # ---------------------
    # UPDATE USER
    # ---------------------
    def put(self, request, pk):

        if not request.user_id:
            return Response({"error": "Unauthorized"}, status=401)

        user = get_object_or_404(User, pk=pk)

        # 🔐 user himself OR admin
        if str(user.id) != str(request.user_id) and not request.is_admin:
            return Response({"error": "Not allowed"}, status=403)

        serializer = RegisterSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # ---------------------
    # DELETE USER
    # ---------------------
    def delete(self, request, pk):

        if not request.user_id:
            return Response({"error": "Unauthorized"}, status=401)

        if not request.is_admin:
            return Response({"error": "Only admin can delete users"}, status=403)

        user = get_object_or_404(User, pk=pk)
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)