import os
import json
from django.conf import settings

def readJSON_File():
    # it prevent twice calling from manage.py during run the server
    if os.environ.get('RUN_MAIN') == 'true':
        return
    
    try:
        filePath = os.path.join(os.path.abspath(settings.BASE_DIR), "stock_market_data.json")
        print("JSON data read :", filePath)
        
        with open(filePath, "r") as file:
            data = json.load(file)
            return data
    except Exception:
        print(f"An error occured during convert json file: {Exception}")
        return None
