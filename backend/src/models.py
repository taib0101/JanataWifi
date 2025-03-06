import os
import psycopg2
import uuid
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


def Create_New_Table(cursor):
    data = JSON.readJSON_File()

    try: 
        cursor.execute("""
            CREATE TABLE janata (
                objectID VARCHAR(100) PRIMARY KEY NOT NULL,
                date VARCHAR(12) NOT NULL,
                trade_code VARCHAR(15) NOT NULL,
                high VARCHAR(15) NOT NULL,
                low VARCHAR(15) NOT NULL,
                open VARCHAR(15) NOT NULL,
                close VARCHAR(15) NOT NULL,
                volume VARCHAR(15) NOT NULL
            )
        """)

        cursor.execute("""
            CREATE INDEX index_objectID ON janata(objectID)
        """)

        for value in data:
            uniqueId = uuid.uuid1()
            cursor.execute("""
                INSERT INTO janata(objectID, date, trade_code, high, low, open, close, volume)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (str(uniqueId), value['date'], value['trade_code'], value['high'], value['low'], value['open'], value['close'], value['volume'],))
    except Exception:
        print(f"An error occured during creating database table: {Exception}")

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
    # print(f"Janata exists ? {existsTable}")

    if existsTable is True:
        print("already exists")
    else:
        Create_New_Table(cursor)

    connection.commit()
    cursor.close()
