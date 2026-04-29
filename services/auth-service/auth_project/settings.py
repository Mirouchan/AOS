import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ====================
# 🔐 SECURITY (DEV ONLY)
# ====================
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-dev-only-change-in-prod"
)

DEBUG = True

ALLOWED_HOSTS = ["*"]  # dev only

# ====================
# 📦 APPS
# ====================
INSTALLED_APPS = [
   'django.contrib.admin',
'django.contrib.auth',
'django.contrib.contenttypes',
'django.contrib.sessions',
'django.contrib.messages',
'django.contrib.staticfiles',
    # third party
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',

    # local apps
    'users',
    'authentication',
]

# ====================
# 🚫 MIDDLEWARE (SIMPLIFIED)
# ====================
MIDDLEWARE = [
   'django.contrib.sessions.middleware.SessionMiddleware',
   'django.middleware.common.CommonMiddleware',
   'django.middleware.csrf.CsrfViewMiddleware',
   'django.contrib.auth.middleware.AuthenticationMiddleware',
   'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'auth_project.urls'

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
]
        },
    },
]

WSGI_APPLICATION = 'auth_project.wsgi.application'

# ====================
# 🗄️ DATABASE
# ====================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME', 'auth_db'),
        'USER': os.getenv('DB_USER', 'root'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'root'),
        'HOST': os.getenv('DB_HOST', 'auth-db'),
        'PORT': '3306',
    }
}

# ====================
# 👤 CUSTOM USER MODEL
# ====================
AUTH_USER_MODEL = 'users.User'

# ====================
# 🌍 INTERNATIONALIZATION
# ====================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ====================
# 📦 STATIC
# ====================
STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ====================
# 🔥 SIMPLE JWT (ISSUER ONLY)
# ====================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),

    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,

    # 🔥 مهم للمicroservices
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ====================
# 🌐 CORS (DEV ONLY)
# ====================
CORS_ALLOW_ALL_ORIGINS = True