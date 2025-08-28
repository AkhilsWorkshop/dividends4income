from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .dividends import company_dividend
from .info_all import yfinance_info
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
        context = {}
        context['ticker'] = tid.upper()
        context['dividend'] = company_dividend(tid)
        context['info'] = yfinance_info(tid)

        response = JsonResponse(context)
        return add_cors_headers(response)
    except Exception as e:
        response = JsonResponse({
            'error': f'Failed to fetch data for {tid}',
            'details': str(e)
        }, status=500)
        return add_cors_headers(response)

@csrf_exempt
@require_http_methods(["GET", "OPTIONS"])
def api_popular_stocks(request):
    """Get popular dividend stocks"""
    
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = JsonResponse({'status': 'ok'})
        return add_cors_headers(response)

    try:
        limit = int(request.GET.get('limit', 6))
        # Ensure limit is reasonable
        limit = min(max(limit, 1), 12)

        stocks = PopularStocksService.get_popular_stocks(limit)

        response = JsonResponse({
            'stocks': stocks,
            'count': len(stocks)
        })

        return add_cors_headers(response)
    
    except Exception as e:
        response = JsonResponse({
            'error': 'Failed to fetch popular stocks',
            'details': str(e)
        }, status=500)
        return add_cors_headers(response)


