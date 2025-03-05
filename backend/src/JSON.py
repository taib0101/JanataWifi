import json
import psycopg2


def readJSON_File():
    try:
        with open("../stock_market_data.json", "r") as file:
            data = json.load(file)
            return data
    except Exception:
        print(f"An error occured during json file: {Exception}")
        return None

