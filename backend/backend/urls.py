from src import views
from django.urls import path

urlpatterns = [
    path('create/', views.createData_Views, name='create_slash'),
    path('create', views.createData_Views, name='create_no_slash'),
    path('', views.readData_Views),
    path('update/', views.updateData_Views, name='read_slash'),
    path('update', views.updateData_Views, name='read_no_slash'),
]
