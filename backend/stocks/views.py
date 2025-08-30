from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .services import PopularStocksService

@csrf_exempt
@require_http_methods(["GET"])
def api_ticker(request, tid):

    try:

        stock = PopularStocksService.get_stock_info(tid)

        response = JsonResponse({
            'stock': stock,
        })

        return response

    except Exception as e:
        response = JsonResponse({
            'error': f'Failed to fetch data for {tid}',
            'details': str(e)
        }, status=500)
        return response

@csrf_exempt
@require_http_methods(["GET"])
def api_popular_stocks(request):

    try:

        stocks = PopularStocksService.get_popular_stocks()

        response = JsonResponse({
            'stocks': stocks,
        })

        return response
    
    except Exception as e:
        response = JsonResponse({
            'error': 'Failed to fetch popular stocks',
            'details': str(e)
        }, status=500)
        return response


