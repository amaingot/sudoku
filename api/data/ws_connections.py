from datetime import datetime
from typing import Optional, TypedDict
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

from api.utils.date_time import get_now_str, parse_datetime
from api.utils.logging import logger
from api.config import config

dynamodb = boto3.resource('dynamodb')


class WsConnection(TypedDict):
    connection_id: str
    user_id: str
    created_at: datetime


def deserialize(data) -> WsConnection:
    connection: WsConnection = {
        'connection_id': f"{data.get('connection_id', '')}",
        'user_id': f"{data.get('user_id', '')}",
        'created_at': parse_datetime(data.get('created_at', '')),
    }
    return connection


def create(user_id: str, connection_id: str):
    table = dynamodb.Table(config.ws_connections_dynamodb_table)
    try:
        response = table.put_item(Item={
            "connection_id": connection_id,
            "user_id": user_id,
            'created_at': get_now_str(),
        })
        return response
    except ClientError as e:
        logger.error(
            f"Failed to add connection. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def get(connection_id: str) -> Optional[WsConnection]:
    table = dynamodb.Table(config.ws_connections_dynamodb_table)
    try:
        response = table.get_item(
            Key={'connection_id': connection_id}
        )
        data = response.get('Item', {})
        return deserialize(data)
    except ClientError as e:
        logger.error(
            f"Failed to get connections. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def list_by_user_id(user_id: str) -> Optional[list[WsConnection]]:
    table = dynamodb.Table(config.ws_connections_dynamodb_table)
    try:
        response = table.query(
            IndexName='user_id-index',
            KeyConditionExpression=Key("user_id").eq(user_id)
        )
        data = response.get('Items', [])
        return [deserialize(item) for item in data]
    except ClientError as e:
        logger.error(
            f"Failed to get chats. Error: {e.response.get('Error', {}).get('Message', '')}")
        return None


def delete(connection_id: str) -> bool:
    table = dynamodb.Table(config.ws_connections_dynamodb_table)
    try:
        table.delete_item(
            Key={'connection_id': connection_id}
        )
        return True
    except ClientError as e:
        logger.error(
            f"Failed to delete connection. Error: {e.response.get('Error', {}).get('Message', '')}")
        return False
