from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# =========================
# 🔐 SECURITY (DEV ONLY)
# =========================
SECRET_KEY = "super-secret-key-change-me"
DEBUG = True
ALLOWED_HOSTS = ["*"]

# =========================
# 🔐 JWT CONFIG (Gateway only)
# =========================
JWT_SECRET = "my_super_secret_key_12345"
JWT_ALGORITHM = "HS256"

# =========================
# APPLICATION
# =========================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# =========================
# MIDDLEWARE
# =========================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    # ❌ لا تحتاج CSRF في microservices gateway (اختياري حسب تصميمك)
    'django.middleware.csrf.CsrfViewMiddleware',

    # ❌ نحذف auth default لأننا نستعمل JWT
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # 🔥 JWT Gateway Middleware
    'core.middleware.JWTMiddleware',
]

ROOT_URLCONF = 'core.urls'

# =========================
# TEMPLATES (غير مستخدم غالباً في gateway)
# =========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# =========================
# DATABASE (optional gateway DB)
# =========================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# =========================
# PASSWORD VALIDATION
# =========================
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# =========================
# INTERNATIONALIZATION
# =========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# =========================
# STATIC
# =========================
STATIC_URL = 'static/'

# =========================
# DEFAULT PK
# =========================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'