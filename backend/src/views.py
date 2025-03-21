from django.http import JsonResponse
from .CRUD import createData, readData, updateData, deleteData
import json
from mysql.connector import OperationalError

def createData_Views(request):
    if request.method == 'POST':
        requestBody = json.loads(request.body)
        databaseResponse = createData.Create_Operation(requestBody)

        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)

        return JsonResponse({
            "message": "Inserted Data Successfully"
        }, status = 200)

    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)


def readData_Views(request):
    if request.method == 'GET':
        databaseResponse = readData.Read_Operation()

        if isinstance(databaseResponse, OperationalError):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)

        return JsonResponse({
            "message": "Readed Data Successfully",
            "data": databaseResponse
        }, status = 200)

    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def updateData_Views(request):
    if request.method == 'PUT':
        objectID = request.META.get('HTTP_OBJECTID')
        requestBody = json.loads(request.body)
        # print("update view : ", objectID, requestBody)

        databaseResponse = updateData.Update_Operation(objectID, requestBody)
        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)

        return JsonResponse({
            "message": "Updated Data Successfully",
        }, status = 200)

    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def deleteData_Views(request):
    if request.method == 'DELETE':
        objectID = request.META.get('HTTP_OBJECTID')

        databaseResponse = deleteData.Delete_Operation(objectID)
        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)

        return JsonResponse({
            "message": "Deleted Data Successfully",
        }, status = 200)

    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)