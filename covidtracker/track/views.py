from django.shortcuts import render
import requests

# Create your views here.
# Create your views here.


def base(request):
    url = "https://covid-193.p.rapidapi.com/countries"

    headers = {
        'x-rapidapi-key': "cbef3ad3damsh177a38ec66e4f95p1a51f3jsne5512dc00c01",
        'x-rapidapi-host': "covid-193.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    countryList = list(response.text.split('[')[3].split(']')[0].split(','))

    return render(request, 'index.html', {"country_list": countryList})
