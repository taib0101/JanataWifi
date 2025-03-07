from django.http import JsonResponse, StreamingHttpResponse
import manage
from .CRUD import createData, readData, updateData, deleteData
import json

connection = manage.connection

def createData_Views(request):
    if request.method == 'POST':
        requestBody = json.loads(request.body)
        databaseResponse = createData.Create_Operation(connection, requestBody)

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

def getData(data):
    yield '{"message": "Readed Data Successfully", "data": ['
    first = True
    for item in data:
        if not first:
            yield ','
        else:
            first = False

        yield json.dumps(item)
    yield ']}'

def readData_Views(request):
    if request.method == 'GET':
        databaseResponse = readData.Read_Operation(connection)

        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)
        
        return StreamingHttpResponse(getData(databaseResponse), content_type='application/json')
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def updateData_Views(request):
    if request.method == 'PUT':
        objectID = request.META.get('HTTP_OBJECTID')
        requestBody = json.loads(request.body)
        # print("update view : ", objectID, requestBody)

        databaseResponse = updateData.Update_Operation(connection, objectID, requestBody)
        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)
        
        return JsonResponse({
            "message": "Updated Data Successfully",
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)

def deleteData_Views(request):
    if request.method == 'DELETE':
        objectID = request.META.get('HTTP_OBJECTID')

        databaseResponse = deleteData.Delete_Operation(connection, objectID)
        if isinstance(databaseResponse, str):
            return JsonResponse({
                "message": databaseResponse
            }, status = 500)
        
        return JsonResponse({
            "message": "Deleted Data Successfully",
        })
    
    return JsonResponse({
        "message": "404 Not Found",
    }, status = 404)