from django.shortcuts import render
import requests
import json
# Create your views here.
# Create your views here.


def base(request):
    try:
        country = request.GET['drop1']
    except KeyError:
        country = ""
    if country == "---select a country---" or country == "":
        country = ""
        result = {'new': '', 'active': '', 'critical': '',
                  'recovered': '', '1M_pop': '', 'total': '', 'country': ''}
    else:
        url = "https://covid-193.p.rapidapi.com/statistics"
        querystring = {"country": country}
        headers = {
            'x-rapidapi-key': "1e2f4f94dbmsh9fc0dcd6b9a82fap1516edjsn402832e9ca33",
            'x-rapidapi-host': "covid-193.p.rapidapi.com"
        }

        response = requests.request(
            "GET", url, headers=headers, params=querystring).json()
        result = response['response'][0]['cases']
        result['country'] = country
        print(result)
    return render(request, 'index.html', result)
