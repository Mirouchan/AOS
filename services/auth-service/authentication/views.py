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

            return Response(
                {
                    "message": "User created successfully",
                    "user": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

            # 🔥 نضيف بيانات داخل JWT
            refresh["user_id"] = user.id
            refresh["username"] = user.username
            refresh["is_admin"] = user.is_staff

            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "is_admin": user.is_staff
                    }
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------------
# LOGOUT (FIXED INDENTATION)
# -------------------------
from rest_framework.permissions import AllowAny

class LogoutView(APIView):
    permission_classes = [AllowAny]  # ✅ لأن Gateway هو اللي يحمي

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"error": "Refresh token required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logout successful"}, status=200)

        except Exception:
            return Response(
                {"error": "Invalid token"},
                status=400
            )

# -------------------------
# ME (PROFILE)
# -------------------------
class MeView(APIView):
    permission_classes = []  # Gateway يحمي

    def get(self, request):
        user_id = request.headers.get("X-User-Id")
        username = request.headers.get("X-User-Name")
        is_admin = request.headers.get("X-User-Is-Admin")

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        return Response(
            {
                "id": user_id,
                "username": username,
                "is_admin": is_admin == "True"
            },
            status=200
        )