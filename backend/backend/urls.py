from src import views
from django.urls import path
from . import globalVariables
from src import models

requestValues = {
    "date": "06-03-2025",
    "trade_code": "1JANATAMF",
    "high": "4.3",
    "low": "4.1",
    "open": "4.2",
    "close": "4.1",
    "volume": "2,285,416"
}
urlpatterns = [
    path('create/', views.my_views)
]
