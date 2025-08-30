from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='your-fallback-secret-key-for-local-dev')

DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    'd4i.akhilkumar.dev',
    'api.d4i.akhilkumar.dev',
    '.vercel.app'
]

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'corsheaders',
    'stocks',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'DjangoApp.middleware.FrontendOnlyMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "https://d4i.akhilkumar.dev",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

ROOT_URLCONF = 'DjangoApp.urls'
WSGI_APPLICATION = 'DjangoApp.wsgi.application'

DATABASES = {}
USE_TZ = False

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]