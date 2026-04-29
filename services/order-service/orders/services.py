import requests

AUTH_SERVICE_URL = "http://auth-service:8000/api/auth/verify-token/"
PRODUCT_SERVICE_URL = "http://product-service:8000/api/products/"

def verify_user(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(AUTH_SERVICE_URL, headers=headers)
    if response.status_code != 200:
        return None
    return response.json()  # should return user info including 'id', 'username', etc.

def get_product(product_id):
    response = requests.get(f"{PRODUCT_SERVICE_URL}{product_id}/")
    if response.status_code != 200:
        return None
    return response.json()