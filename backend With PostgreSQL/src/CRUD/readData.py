from .. import models

def Read_Operation(connection):
    try:
        if connection is None:
            raise Exception("Connection Didn't extablished")

        cursor = connection.cursor()
        if models.existsTable(cursor) is False:
            models.Create_New_Table(connection, cursor)

        cursor.execute("""
            SELECT * FROM janata
        """)
        data = cursor.fetchall()
        result = []

        columns = [columnDescription[0] for columnDescription in cursor.description]
        # print(columns)

        for row in data:
            result.append(dict(zip(columns, row)))

        cursor.close()
        return result
    except Exception as exce:
        return exce