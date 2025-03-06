import psycopg2
import uuid
from . import JSON

def createConnection():
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


def Create_New_Table(connection, cursor):
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
            """, (str(uniqueId), value['date'], value['trade_code'], 
            value['high'], value['low'], value['open'], value['close'], value['volume'],))
        connection.commit()

    except Exception:
        print(f"An error occured during creating database table: {Exception}")


def existsTable(cursor):
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM pg_tables
            WHERE tablename=%s
        )
    """, ("janata",))
    exists = cursor.fetchone()[0]

    return exists
