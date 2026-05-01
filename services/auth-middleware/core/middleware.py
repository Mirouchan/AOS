import jwt
from django.conf import settings
from django.http import JsonResponse

class JWTGatewayMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        auth = request.headers.get("Authorization")

        if not auth:
            return JsonResponse({"error": "No token"}, status=401)

        try:
            token = auth.split(" ")[1]

            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )

            # 🔥 trusted identity (NOT from client headers)
            request.user_id = payload.get("user_id")
            request.username = payload.get("username")
            request.is_admin = payload.get("is_admin")

        except Exception:
            return JsonResponse({"error": "Invalid token"}, status=401)

        return self.get_response(request)