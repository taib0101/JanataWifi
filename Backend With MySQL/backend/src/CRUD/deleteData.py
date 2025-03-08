from mysql.connector import Error, OperationalError
from .. import models

def Delete_Operation(connection, objectID):
    try:
        cursor = connection.cursor()
        
        cursor.execute("""
            DELETE FROM janata WHERE objectID = %s
        """, (objectID, ))

        connection.commit()
        cursor.close()
    
        return
    except Error as exce:
        if isinstance(exce, OperationalError):
            Delete_Operation(models.createConnection(), objectID)
        return str(exce)
