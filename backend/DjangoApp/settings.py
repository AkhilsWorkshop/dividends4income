from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='django-insecure-q02^5h3x%&b4nv*dc+ys#y2vlu#3+^byqr!5x!@c=u3g!+z-te')

DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'stocks',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'DjangoApp.urls'

WSGI_APPLICATION = 'DjangoApp.wsgi.application'

DATABASES = {}
USE_TZ = False
