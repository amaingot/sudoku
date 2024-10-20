from typing import Optional
from datetime import datetime
from ariadne import ScalarType
from api.utils.date_time import parse_datetime, serialize_datetime

datetime_scalar = ScalarType("DateTime")


@datetime_scalar.serializer
def serialize_datetime_scalar(value) -> Optional[str]:
    return serialize_datetime(value)


@datetime_scalar.value_parser
def parse_datetime_scalar(value: str) -> datetime:
    return parse_datetime(value)
