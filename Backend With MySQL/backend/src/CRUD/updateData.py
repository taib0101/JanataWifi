from mysql.connector import Error, OperationalError
from .. import models

def Update_Operation(connection, objectID, requestBody):
    try:
        cursor = connection.cursor()
        cursor.execute("""
            UPDATE janata SET date = %s, trade_code = %s, high = %s, low = %s,
            open = %s, close = %s, volume = %s WHERE objectId = %s
        """, (requestBody["date"], requestBody["trade_code"], requestBody["high"], requestBody["low"], 
        requestBody["open"], requestBody["close"], requestBody["volume"], objectID, ))

        connection.commit()
        cursor.close()

        return 
    except Error as exce:
        if isinstance(exce, OperationalError):
            Update_Operation(models.createConnection(),objectID , requestBody)
        return str(exce)