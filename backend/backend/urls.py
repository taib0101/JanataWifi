from src import views
from django.urls import path

urlpatterns = [
    path('create/', views.createData_Views)
]
