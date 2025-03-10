import psycopg2
import uuid
from . import JSON
from backend import settings

def createConnection():
    try:
        # connection = psycopg2.connect(
        #     host="localhost",
        #     database="taibDatabase",
        #     user="taib",
        #     password="1234",
        #     port="5432"
        # )

        # avine database Url
        connection = psycopg2.connect(settings.DATABASES_URL)

        print("Connection established successfully!")
        return connection
    except psycopg2.Error as exce:
        print(f"An error occured during database configuration: {exce}")
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

    except psycopg2.Error as exce:
        print(f"An error occured during creating database table: {exce}")


def existsTable(cursor):
    try:
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM pg_tables
                WHERE tablename=%s
            )
        """, ("janata",))
        exists = cursor.fetchone()[0]

        return exists
    except psycopg2.Error as exce:
        print(f"An error occured during check table exists : {exce}")