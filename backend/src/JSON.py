import os
import json

def readJSON_File():
    try:
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        with open("../stock_market_data.json", "r") as file:
            data = json.load(file)
            return data
    except Exception:
        print(f"An error occured during json file: {Exception}")
        return None

readJSON_File()