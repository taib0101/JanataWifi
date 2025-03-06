from django.http import HttpResponse
import manage
from . import models
# Create your views here.

requestValues = {
    "date": "06-03-2025",
    "trade_code": "1JANATAMF",
    "high": "4.3",
    "low": "4.1",
    "open": "4.2",
    "close": "4.1",
    "volume": "2,285,416"
}

connection = manage.connection

def createData_Views(request):
    models.Create_Operation(connection, requestValues)
    return HttpResponse("Bro, this is me Taib, Okay!")
