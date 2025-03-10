from .. import models

def Delete_Operation(connection, objectID):
    try:
        if connection is None:
            return "Connection Didn't extablished"

        cursor = connection.cursor()
        
        cursor.execute("""
            DELETE FROM janata WHERE objectID = %s
        """, (objectID, ))

        connection.commit()
        cursor.close()
    
        return
    except Exception as exce:
        return exce
