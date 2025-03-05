from src import views
from django.urls import path

urlpatterns = [
    path('hello/', views.my_views)
]
