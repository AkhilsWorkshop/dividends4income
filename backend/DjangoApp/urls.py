from django.urls import path
from stocks import views

urlpatterns = [
    path('stocks/<str:tid>/', views.api_ticker, name='api_ticker_slash'),
    path('stocks/<str:tid>', views.api_ticker, name='api_ticker'),
    path('popular-stocks/', views.api_popular_stocks, name='api_popular_stocks_slash'),
    path('popular/stocks', views.api_popular_stocks, name='api_popular_stocks'),
]
