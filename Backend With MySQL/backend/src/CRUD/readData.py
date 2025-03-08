from .. import models
from mysql.connector import Error, OperationalError

def Read_Operation(connection):
    try:
        cursor = connection.cursor()
        existsTableResponse = models.existsTable(cursor)

        if isinstance(existsTableResponse, OperationalError):
            raise Exception(existsTableResponse)

        if existsTableResponse is None:
            create_New_TableResponse = models.Create_New_Table(connection, cursor)
            if isinstance(create_New_TableResponse, OperationalError):
                raise Exception(create_New_TableResponse)

        cursor.execute("""
            SELECT * FROM janata
        """)
        data = cursor.fetchall()
        result = []
        
        columns = [columnDescription[0] for columnDescription in cursor.description]
        cursor.close()

        for row in data:
            result.append(dict(zip(columns, row)))

        return result
    except (Error, Exception) as exce:
        if isinstance(exce, OperationalError):
            Read_Operation(models.createConnection())
        return exce
        