from mysql.connector import Error, OperationalError
from .. import models

def Update_Operation(objectID, requestBody):
    try:
        connection = models.createConnection()
        cursor = connection.cursor()
        cursor.execute("""
            UPDATE janata SET date = %s, trade_code = %s, high = %s, low = %s,
            open = %s, close = %s, volume = %s WHERE objectId = %s
        """, (requestBody["date"], requestBody["trade_code"], requestBody["high"], requestBody["low"], 
        requestBody["open"], requestBody["close"], requestBody["volume"], objectID, ))

        connection.commit()
        cursor.close()
        connection.close()

        return 
    except Error as exce:
        if isinstance(exce, OperationalError):
            Update_Operation(objectID , requestBody)
        return str(exce)
