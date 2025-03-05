import json
import pydoc
import pandas as pd

try:
    with open("../../stock_market_data.json", "r") as file:
        print(file.head(10))
except Exception: 
    print(f"An error occured during json file: {Exception}")