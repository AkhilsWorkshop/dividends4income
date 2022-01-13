from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from pandas.core.frame import DataFrame
from .forms import TickerForm
from .dividends import company_dividend
from .info import company_info
from .news import company_news
from .info2 import twelve_data_profile
from .history import twelve_data_stats
from .info_all import yfinance_info

@csrf_exempt
def index(request):
    if request.method == 'POST':
        form = TickerForm(request.POST)
        if form.is_valid():
            ticker = request.POST['ticker']
            return HttpResponseRedirect(ticker)
    else:
        form = TickerForm()
    return render(request, 'index.html', {'form': form})

def ticker(request, tid):
    context = {}
    context['ticker'] = tid
    context['news'] = company_news(tid)
    context['dividend'] = company_dividend(tid)
    context['info'] = company_info(tid)
    context['info2'] = twelve_data_profile(tid)
    context['stats'] = twelve_data_stats(tid)
    context['infoall'] = yfinance_info(tid)
    return render(request, 'ticker.html', context)


