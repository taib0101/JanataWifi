from django.http import JsonResponse
import manage
from . import models
import json


connection = manage.connection

def custom404(request, exception):
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def createData_Views(request):
    if request.method == 'POST':
        models.Create_Operation(connection, json.loads(request.body))
        return JsonResponse({
            "message": "Inserted Data Successfully"
        })

    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def readData_Views(request):
    if request.method == 'GET':
        responseData = models.Read_Operation(connection)
        return JsonResponse({
            "message": "Readed Data Successfully",
            "data": responseData
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def updateData_Views(request):
    if request.method == 'PUT':
        return JsonResponse({
            "message": "Updated Data Successfully",
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)