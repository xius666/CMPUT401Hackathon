from django.shortcuts import render

# Create your views here.
# Create your views here.


def base(request):
    try:
        country = request.GET['drop1']
    except KeyError:
        country = ""
    if country == "---select a conntry---":
        country = ""

    return render(request, 'index.html', {'country': country})
