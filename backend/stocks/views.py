from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .services import PopularStocksService

def add_cors_headers(response):
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

@csrf_exempt
@require_http_methods(["GET"])
def api_ticker(request, tid):

    try:

        stock = PopularStocksService.get_stock_info(tid)

        response = JsonResponse({
            'stock': stock,
        })

        return add_cors_headers(response)

    except Exception as e:
        response = JsonResponse({
            'error': f'Failed to fetch data for {tid}',
            'details': str(e)
        }, status=500)
        return add_cors_headers(response)

@csrf_exempt
@require_http_methods(["GET"])
def api_popular_stocks(request):

    try:

        stocks = PopularStocksService.get_popular_stocks()

        response = JsonResponse({
            'stocks': stocks,
        })

        return add_cors_headers(response)
    
    except Exception as e:
        response = JsonResponse({
            'error': 'Failed to fetch popular stocks',
            'details': str(e)
        }, status=500)
        return add_cors_headers(response)


