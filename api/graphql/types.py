from typing import TypedDict, Optional
from enum import StrEnum


class PageInfo(TypedDict):
    has_next_page: bool
    has_previous_page: bool


class PaginationInput(TypedDict):
    page: Optional[int]
    per_page: Optional[int]


class SortOrder(StrEnum):
    ASC = "ASC"
    DESC = "DESC"


class SortInput(TypedDict):
    field: str
    order: SortOrder


class DateFilter(TypedDict):
    gt: Optional[str]
    gte: Optional[str]
    lte: Optional[str]
    lt: Optional[str]
    equals: Optional[str]
    is_empty: Optional[bool]
    is_not_empty: Optional[bool]


class StringFilter(TypedDict):
    contains: Optional[str]
    equals: Optional[str]
    starts_with: Optional[str]
    ends_with: Optional[str]
    is_empty: Optional[bool]
    is_not_empty: Optional[bool]
    is_any_of: Optional[list[str]]


class IntFilter(TypedDict):
    equals: Optional[int]
    gt: Optional[int]
    gte: Optional[int]
    lte: Optional[int]
    lt: Optional[int]
    is_empty: Optional[bool]
    is_not_empty: Optional[bool]


class FloatFilter(TypedDict):
    equals: Optional[float]
    gt: Optional[float]
    gte: Optional[float]
    lte: Optional[float]
    lt: Optional[float]
    is_empty: Optional[bool]
    is_not_empty: Optional[bool]


class BooleanFilter(TypedDict):
    equals: Optional[bool]
    is_empty: Optional[bool]
    is_not_empty: Optional[bool]
