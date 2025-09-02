from django.urls import path
from stocks import views
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Backend API is running',
    })

urlpatterns = [
    path('', api_root, name='api-root'), 
    path('stocks/<str:tid>', views.api_ticker, name='api_ticker'),
    path('stocks/analysis/reddit', views.api_reddit_data, name='api_reddit_analysis'),
    path('popular/stocks', views.api_popular_stocks, name='api_popular_stocks'),
    path('tickers/search', views.api_ticker_search, name='api_ticker_search'),
]
