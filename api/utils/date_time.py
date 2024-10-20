from typing import Optional
from datetime import datetime, timezone
from dateutil import parser


def parse_datetime(dt: str) -> datetime:
    parsed = safe_parse_datetime(dt)
    if parsed:
        return parsed
    raise Exception(f"DateTime cannot represent value: {dt}")


def safe_parse_datetime(dt: Optional[str]) -> Optional[datetime]:
    try:
        if isinstance(dt, datetime):
            return dt
        if isinstance(dt, str):
            return parser.parse(dt)
    except Exception:
        # print(f"Failed to parse datetime: {dt}. Error: {e}")
        return None


def serialize_datetime(value) -> Optional[str]:
    if isinstance(value, str):
        return parser.parse(value).isoformat()
    if isinstance(value, datetime):
        return value.isoformat()
    return None


def get_now_datetime() -> datetime:
    return datetime.now(timezone.utc)


def get_now_str() -> str:
    return get_now_datetime().isoformat()
