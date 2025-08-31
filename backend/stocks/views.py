from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .services import PopularStocksService
import requests
from decouple import config

@csrf_exempt
@require_http_methods(["GET"])
def api_ticker_search(request):

    try:
        query = request.GET.get('q', '').strip()

        headers = {
            'User-Agent': config('REDDIT_USER_AGENT')
        }
        response = requests.get('https://www.sec.gov/files/company_tickers.json', headers=headers)
        response.raise_for_status()

        data = response.json()

        all_tickers = []

        for key, value in data.items():
            all_tickers.append({
                'cik_str': value['cik_str'],
                'ticker': value['ticker'],
                'title': value['title']
            })

        if query:

            filtered_tickers = []
            query_lower = query.lower()

            for ticker in all_tickers:
                if (query_lower in ticker['ticker'].lower() or
                    query_lower in ticker['title'].lower()):
                    filtered_tickers.append({
                        'ticker': ticker['ticker'],
                        'title': ticker['title']
                    })

            filtered_tickers = filtered_tickers[:10]

            return JsonResponse({
                'suggestions': filtered_tickers
            })
        
        else:
            return JsonResponse({
                'suggestions': []
            })

    except requests.RequestException as e:
        return JsonResponse({
            'error': 'Failed to fetch ticker data from SEC',
            'details': str(e)
        }, status=500)
    except Exception as e:
        return JsonResponse({
            'error': 'Internal server error',
            'details': str(e)
        }, status=500)

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
def api_reddit_data(request, tid):

    try:

        stock = PopularStocksService.get_reddit_posts_and_summary(tid)

        response = JsonResponse({
            'reddit': stock,
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


