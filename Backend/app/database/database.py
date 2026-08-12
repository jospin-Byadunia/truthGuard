
import os
import sqlite3
from pathlib import Path

# Check if running in a cloud/container environment with a mounted persistent disk
# e.g., DATA_DIR="/app/backend/storage" on Render
DATA_DIR_STR = os.getenv("DATA_DIR")

if DATA_DIR_STR:
    STORAGE_DIR = Path(DATA_DIR_STR)
else:
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    STORAGE_DIR = BASE_DIR / "storage"

STORAGE_DIR.mkdir(parents=True, exist_ok=True)
DATABASE_PATH = STORAGE_DIR / "truthguard.db"


def get_connection():
    connection = sqlite3.connect(
        DATABASE_PATH,
        timeout=10,
    )
    connection.row_factory = sqlite3.Row
    return connection