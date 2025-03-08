import uuid
from mysql.connector import Error, OperationalError
from .. import models

def Create_Operation(requestBody):
    try:
        connection = models.createConnection()
        cursor = connection.cursor()
        uniqueId = uuid.uuid1()

        cursor.execute("""
                INSERT INTO janata(objectID, date, trade_code, high, low, open, close, volume)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (str(uniqueId), requestBody["date"], requestBody["trade_code"], requestBody["high"],
                  requestBody["low"], requestBody["open"], requestBody["close"], requestBody["volume"],))

        connection.commit()
        cursor.close()
        connection.close()

        return
    except Error as exce:
        if isinstance(exce, OperationalError):
            Create_Operation(requestBody)
        return str(exce)

