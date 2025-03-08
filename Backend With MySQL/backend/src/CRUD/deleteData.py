from mysql.connector import Error, OperationalError
from .. import models

def Delete_Operation(objectID):
    try:
        connection = models.createConnection()
        cursor = connection.cursor()
        
        cursor.execute("""
            DELETE FROM janata WHERE objectID = %s
        """, (objectID, ))

        connection.commit()
        cursor.close()
        connection.close()
    
        return
    except Error as exce:
        if isinstance(exce, OperationalError):
            Delete_Operation(objectID)
        return str(exce)

