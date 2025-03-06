import uuid

def Create_Operation(connection, requestBody):
    try:
        if connection is None:
            raise Exception("Connection Didn't extablished")

        cursor = connection.cursor()
        uniqueId = uuid.uuid1()

        # to read last 10 data
        # select * from janata offset (select count(*) from janata) - 10 limit 10;
        cursor.execute("""
                INSERT INTO janata(objectID, date, trade_code, high, low, open, close, volume)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (str(uniqueId), requestBody["date"], requestBody["trade_code"], requestBody["high"],
                  requestBody["low"], requestBody["open"], requestBody["close"], requestBody["volume"],))

        connection.commit()
        cursor.close()

        return
    except Exception as exce:
        return exce
