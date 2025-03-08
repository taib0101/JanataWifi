import uuid
from . import JSON
import mysql.connector
from mysql.connector import Error

def createConnection():
    try:
        # create user, password, databases on localhost
        # $ sudo mysql -u root -p
        # mysql> CREATE USER 'taib'@'localhost' IDENTIFIED BY '1234';
        # mysql> SELECT user, host FROM mysql.user;
        # mysql> GRANT ALL PRIVILEGES ON *.* TO 'taib'@'localhost' WITH GRANT OPTION;
        # mysql> FLUSH PRIVILEGES;
        # exit
        # $ sudo mysql -u taib -h localhost -p
        # mysql> SHOW GRANTS;
        # mysql> CREATE DATABASE taibDatabase;
        # mysql> USE taibDatabase;

        # localhost
        connection = mysql.connector.connect(
            host = "localhost",
            database = "taibDatabase",
            user = "taib",
            password = "1234"
        )
        print("Connection established successfully!")

        return connection
    except Error as exce:
        print(f"An error occured during database configuration: {exce}")
            


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

        return None
    except Error as exce:
        return exce


def existsTable(cursor):
    try:
        cursor.execute("""
            SHOW TABLES LIKE %s
        """, ("janata",))
        exists = cursor.fetchone()

        return exists
    except Error as exce:
        return exce
