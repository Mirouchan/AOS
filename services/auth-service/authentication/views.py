from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from users.serializers import RegisterSerializer
from .serializers import LoginSerializer


# -------------------------
# REGISTER
# -------------------------
class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            refresh.access_token["user_id"] = user.id
            refresh.access_token["is_admin"] = user.is_staff

            return Response({
                "message": "User created successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": serializer.data
            }, status=201)

        return Response(serializer.errors, status=400)
# -------------------------
# LOGIN
# -------------------------
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data

            refresh = RefreshToken.for_user(user)

            # ✅ place claims in ACCESS token only
            refresh.access_token["user_id"] = user.id
            refresh.access_token["username"] = user.username
            refresh.access_token["is_admin"] = user.is_staff

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "is_admin": user.is_staff
                }
            })

        return Response(serializer.errors, status=400)
# -------------------------
# LOGOUT (FIXED INDENTATION)
# -------------------------
from rest_framework.permissions import AllowAny

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"error": "Refresh token required"}, status=400)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logout successful"}, status=200)

        except Exception:
            return Response({"error": "Invalid token"}, status=400)
# -------------------------
# ME (PROFILE)
# -------------------------
class MeView(APIView):

    def get(self, request):

        user_id = getattr(request, "user_id", None)
        username = getattr(request, "username", None)
        is_admin = getattr(request, "is_admin", False)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        return Response({
            "id": user_id,
            "username": username,
            "is_admin": is_admin
        })