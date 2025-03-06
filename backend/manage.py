import os
import sys
from src import models

# giving connection to data base

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    try:
        from django.core.management import execute_from_command_line

        connection = models.createConnection()
        requestValues = {
            "date": "06-03-2025",
            "trade_code": "1JANATAMF",
            "high": "4.3",
            "low": "4.1",
            "open": "4.2",
            "close": "4.1",
            "volume": "2,285,416"
        }
        models.Create_Operation(connection, requestValues)
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
