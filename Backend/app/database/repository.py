# app/database/repository.py

import json
import uuid

from app.database.database import get_connection


def save_verification(
    platform: str,
    request_type: str,
    claim: str,
    verdict: str,
    confidence: float,
    explanation: str,
    sources: list,
    execution_time: float,
):
    request_id = str(uuid.uuid4())

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO verification_requests (
                request_id,
                platform,
                request_type,
                claim,
                verdict,
                confidence,
                explanation,
                sources,
                execution_time
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            request_id,
            platform,
            request_type,
            claim,
            verdict,
            confidence,
            explanation,
            json.dumps(sources),
            execution_time,
        ))

        connection.commit()

        return request_id

    finally:
        connection.close()


def get_recent_verifications(limit: int = 20):

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM verification_requests
            ORDER BY created_at DESC
            LIMIT ?
        """, (limit,))

        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    finally:
        connection.close()

def get_verification(request_id: str):

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM verification_requests
            WHERE request_id = ?
        """, (request_id,))

        row = cursor.fetchone()

        if row is None:
            return None

        result = dict(row)

        result["sources"] = json.loads(
            result["sources"] or "[]"
        )

        return result

    finally:
        connection.close()