from django.urls import path
from stocks import views

urlpatterns = [
    path('api/stocks/<str:tid>/', views.api_ticker, name='api_ticker_slash'),
    path('api/stocks/<str:tid>', views.api_ticker, name='api_ticker'),
    path('api/popular-stocks/', views.api_popular_stocks, name='api_popular_stocks_slash'),
    path('api/popular-stocks', views.api_popular_stocks, name='api_popular_stocks'),
]
