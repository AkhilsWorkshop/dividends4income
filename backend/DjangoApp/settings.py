from pathlib import Path
import os
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY')

DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = ['http://localhost:3000/', '127.0.0.1', 'https://d4i.akhilkumar.dev']

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
