from datetime import datetime
from typing import Optional, TypedDict
import boto3
from botocore.exceptions import ClientError

from api.utils.date_time import get_now_str, parse_datetime, serialize_datetime
from api.utils.logging import logger
from api.config import config

dynamodb = boto3.resource('dynamodb')


class User(TypedDict):
    user_id: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    sign_up_code: Optional[str]
    current_sudoku_game_id: Optional[str]
    created_at: datetime
    updated_at: datetime


def deserialize(data) -> User:
    user: User = {
        'user_id': f"{data.get('user_id', '')}",
        'first_name': f"{data.get('first_name', '')}",
        'last_name': f"{data.get('last_name', '')}",
        'email': f"{data.get('email', '')}",
        'phone_number': f"{data.get('phone_number', '')}",
        'sign_up_code': data.get('sign_up_code', None),
        'current_sudoku_game_id': data.get('current_sudoku_game_id', None),
        'created_at': parse_datetime(data.get('created_at', '')),
        'updated_at': parse_datetime(data.get('updated_at', '')),
    }
    return user


class UserParams(TypedDict):
    user_id: str
    first_name: str
    last_name: str
    email: str
    phone_number: str
    sign_up_code: Optional[str]


def create(user: UserParams) -> Optional[User]:
    table = dynamodb.Table(config.users_dynamodb_table)
    new_user: dict = {
        **user,
        "created_at": get_now_str(),
        "updated_at": get_now_str(),
    }
    try:
        table.put_item(Item=new_user)
        return deserialize(new_user)
    except ClientError as e:
        logger.error(
            f"Failed to add user. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def get(user_id: str) -> Optional[User]:
    table = dynamodb.Table(config.users_dynamodb_table)
    try:
        response = table.get_item(
            Key={'user_id': user_id}
        )
        data = response.get('Item', {})
        return deserialize(data)
    except ClientError as e:
        logger.error(
            f"Failed to get user. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def list(limit: int = 25, next_token: Optional[str] = None):
    table = dynamodb.Table(config.users_dynamodb_table)
    try:
        query_kwargs: dict = {
            'Limit': limit
        }
        if next_token:
            query_kwargs['ExclusiveStartKey'] = next_token
        response = table.query(**query_kwargs)
        data = response.get('Items', [])
        items = [deserialize(item) for item in data]
        return {
            'items': items,
            'next_token': response.get('LastEvaluatedKey', None)
        }
    except ClientError as e:
        logger.error(
            f"Failed to list users. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def update(user: User):
    table = dynamodb.Table(config.users_dynamodb_table)
    new_user: dict = {
        **user,
        "created_at": serialize_datetime(user['created_at']),
        "updated_at": get_now_str(),
    }
    try:
        table.put_item(Item=new_user)
        return deserialize(new_user)
    except ClientError as e:
        logger.error(
            f"Failed to add user. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def delete(connection_id: str) -> bool:
    table = dynamodb.Table(config.users_dynamodb_table)
    try:
        table.delete_item(
            Key={'connection_id': connection_id}
        )
        return True
    except ClientError as e:
        logger.error(
            f"Failed to delete user. Error: {e.response.get('Error', {}).get('Message', '')}")
        return False
