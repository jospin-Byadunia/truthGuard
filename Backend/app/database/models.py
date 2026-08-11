# app/database/models.py

from app.database.database import get_connection


def create_tables():

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS verification_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                request_id TEXT NOT NULL UNIQUE,

                platform TEXT NOT NULL,

                request_type TEXT NOT NULL,

                claim TEXT NOT NULL,

                verdict TEXT,

                confidence REAL,

                explanation TEXT,

                sources TEXT,

                execution_time REAL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        connection.commit()

    finally:
        connection.close()