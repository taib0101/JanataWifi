from src import views
from django.urls import path

urlpatterns = [
    path('create/', views.createData_Views, name='create_slash'),
    path('create', views.createData_Views, name='create_no_slash'),
    path('', views.readData_Views),
    path('update/', views.updateData_Views, name='update_slash'),
    path('update', views.updateData_Views, name='update_no_slash'),
    path('delete/', views.deleteData_Views, name='delete_slash'),
    path('delete', views.deleteData_Views, name='delete_no_slash'),
]
