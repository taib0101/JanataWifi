import os
import psycopg2
from src import JSON

def createConnection():
    # it prevent twice calling from manage.py during run the server
    if os.environ.get('RUN_MAIN') == 'true':
        return
    
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="taibDatabase",
            user="taib",
            password="1234",
            port="5432"
        )

        print("Connection established successfully!")
        return connection
    except Exception:
        print(f"An error occured during database configuration: {Exception}")
        return None

# Create your models here.
def Create_Operation(connection):
    if connection is None:
        return "Connection Didn't extablished"

    cursor = connection.cursor()
    # print("Connection Cursor Shit :", cursor)

    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM pg_tables
            WHERE tablename=%s
        )
    """, ("janata",))

    existsTable = cursor.fetchone()[0]
    print(f"Janata exists ? {existsTable}")
    
    if existsTable is False:
        data = JSON.readJSON_File()
        
        cursor.execute("""
            CREATE TABLE Janata (
                objectID VARCHAR(150) PRIMARY KEY NOT NULL,
                date VARCHAR(12) NOT NULL,
                trade_code VARCHAR(50) NOT NULL,
                high VARCHAR(7) NOT NULL,
                low VARCHAR(7) NOT NULL,
                open VARCHAR(7) NOT NULL,
                close VARCHAR(7) NOT NULL,
                volume VARCHAR(30) NOT NULL
            )
        """)

        cursor.execute("""
            CREATE INDEX index_objectID ON Janata(objectID)
        """)
    else:
        print("already exists")

    connection.commit()
    cursor.close()
