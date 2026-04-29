import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


# =========================
# 🔐 SECURITY
# =========================
SECRET_KEY = os.getenv("SECRET_KEY", "same-secret-key-as-auth-service")
DEBUG = True

ALLOWED_HOSTS = ['*'] 


# =========================
# 📦 APPLICATIONS
# =========================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',

    # Local apps
    'notifications',
]


# =========================
# 🧱 MIDDLEWARE
# =========================
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'notification_service.urls'


# =========================
# 🖼 TEMPLATES
# =========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'notification_service.wsgi.application'


# =========================
# 🗄 DATABASE (PRODUCTION READY)
# =========================
DATABASES = {
    'default': {
       'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv("DB_NAME", "notification_db"),
        'USER': os.getenv("DB_USER", "root"),
        'PASSWORD': os.getenv("DB_PASSWORD", "root"),
        'HOST': os.getenv("DB_HOST", "notification_db"),
        'PORT': '3306',
    }
}


# =========================
# 🔐 PASSWORD VALIDATION
# =========================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# =========================
# 🌍 INTERNATIONALIZATION
# =========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# =========================
# 📁 STATIC
# =========================
STATIC_URL = 'static/'


# =========================
# 🔑 DEFAULT PK
# =========================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# =========================
# 🔐 DRF + JWT
# =========================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'SIGNING_KEY': os.getenv("JWT_SECRET", "same-secret-key-as-auth-service"),
}



# =========================
# 🐇 RABBITMQ (MICROSERVICES READY)
# =========================
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", 5672))
RABBITMQ_QUEUE = os.getenv("RABBITMQ_QUEUE", "notifications")
RABBITMQ_EXCHANGE = os.getenv("RABBITMQ_EXCHANGE", "notifications_exchange")


# =========================
# 🌐 CORS (SAFE)
# =========================
CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5173"
).split(",")

CORS_ALLOW_CREDENTIALS = True


# =========================
# 📜 LOGGING (OPTIONAL BUT GOOD)
# =========================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}