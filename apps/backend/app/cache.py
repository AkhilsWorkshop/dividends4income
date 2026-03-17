import redis.asyncio as aioredis

from app.config import REDIS_URL

_redis_client = None

async def get_redis() -> aioredis.Redis:

    global _redis_client

    if _redis_client is None:
        _redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)
        
    return _redis_client
