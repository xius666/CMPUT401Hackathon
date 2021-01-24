from django.shortcuts import render
import requests

# Create your views here.
# Create your views here.


def base(request):
    url = "https://covid-193.p.rapidapi.com/statistics"

    headers = {
        'x-rapidapi-key': "cbef3ad3damsh177a38ec66e4f95p1a51f3jsne5512dc00c01",
        'x-rapidapi-host': "covid-193.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    countryText = list(response.text.split('country\":')[1:])
    countryList = list()

    for text in countryText:
        splitText = text.split('population')
        if splitText[1][2] != 'n':
            countryList.append(splitText[0][0:-2])

    countryList.sort()

    return render(request, 'index.html', {"country_list": countryList})
