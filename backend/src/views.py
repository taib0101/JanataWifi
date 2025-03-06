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
        requestBody = json.loads(request.body)
        models.Create_Operation(connection, requestBody)
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
        objectID = request.META.get('HTTP_OBJECTID')
        requestBody = json.loads(request.body)
        print("update view : ", objectID, requestBody)
        models.Update_Operation(connection, objectID, requestBody)
        return JsonResponse({
            "message": "Updated Data Successfully",
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def deleteData_Views(request):
    if request.method == 'DELETE':
        objectID = request.META.get('HTTP_OBJECTID')
        models.Delete_Operation(connection, objectID)
        return JsonResponse({
            "message": "Deleted Data Successfully",
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)