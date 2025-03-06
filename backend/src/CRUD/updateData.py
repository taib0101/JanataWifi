from .. import models

def Update_Operation(connection, objectID, requestBody):
    try:
        if connection is None:
            raise Exception("Connection Didn't extablished")

        cursor = connection.cursor()
        cursor.execute("""
            UPDATE janata SET date = %s, trade_code = %s, high = %s, low = %s,
            open = %s, close = %s, volume = %s WHERE objectId = %s
        """, (requestBody["date"], requestBody["trade_code"], requestBody["high"], requestBody["low"], 
        requestBody["open"], requestBody["close"], requestBody["volume"], objectID, ))

        connection.commit()
        cursor.close()

        return 
    except Exception as exce:
        return exce