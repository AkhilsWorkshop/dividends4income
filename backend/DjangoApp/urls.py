from django.urls import path
from stocks import views
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Backend API is running',
    })

urlpatterns = [
    path('', api_root, name='api-root'), 
    path('stocks/<str:tid>/', views.api_ticker, name='api_ticker_slash'),
    path('stocks/<str:tid>', views.api_ticker, name='api_ticker'),
    path('popular/stocks', views.api_popular_stocks, name='api_popular_stocks'),
]
