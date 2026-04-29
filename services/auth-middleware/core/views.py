import jwt
from django.http import JsonResponse
from django.conf import settings


def verify(request):
    auth = request.headers.get("Authorization")

    if not auth:
        return JsonResponse({"error": "No token"}, status=401)

    try:
        token = auth.split()[1]

        decoded = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        response = JsonResponse({"message": "OK"})

        # 🔥 نمرر معلومات المستخدم
        response["X-User-Id"] = str(decoded["user_id"])
        response["X-User-Name"] = decoded.get("username", "")
        response["X-User-Is-Admin"] = str(decoded.get("is_admin", False))
        return response

    except jwt.ExpiredSignatureError:
        return JsonResponse({"error": "Token expired"}, status=401)

    except jwt.InvalidTokenError:
        return JsonResponse({"error": "Invalid token"}, status=401)