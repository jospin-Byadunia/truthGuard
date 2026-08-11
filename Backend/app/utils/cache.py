from cachetools import TTLCache
import hashlib


cache = TTLCache(
    maxsize=500,
    ttl=1800
)


def create_cache_key(text: str) -> str:

    normalized = " ".join(
        text.lower().strip().split()
    )

    return hashlib.sha256(
        normalized.encode("utf-8")
    ).hexdigest()


def get_cached(key: str):

    return cache.get(key)


def set_cached(key: str, value):

    cache[key] = value