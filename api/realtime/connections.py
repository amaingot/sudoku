import json
import boto3
from botocore.exceptions import ClientError
from api.config import config
from api.utils.logging import logger
from api.data import ws_connections


apig_management_client = boto3.client(
    "apigatewaymanagementapi", endpoint_url=config.ws_apigateway_endpoint
)


def post_message_to_user(user_id: str, message: dict) -> bool:

    active_connections = ws_connections.list_by_user_id(user_id)
    if active_connections is None:
        return False

    logger.info("Found %s active connections.", len(active_connections))
    message_bytes = bytes(json.dumps(message), "utf-8")

    response = []
    for connection in active_connections:
        response.append(
            post_message_to_connection(
                connection['connection_id'], message_bytes)
        )

    for r in response:
        if not r:
            return False

    return True


def post_message_to_connection(connection_id: str, message_bytes: bytes) -> bool:
    try:
        send_response = apig_management_client.post_to_connection(
            ConnectionId=connection_id, Data=message_bytes
        )
        logger.info(
            "Posted message to connection %s, got response %s.",
            connection_id,
            send_response,
        )
    except apig_management_client.exceptions.GoneException:
        logger.info("Connection %s is gone, removing.", connection_id)
        ws_connections.delete(connection_id)
        return False
    except ClientError:
        logger.exception("Couldn't post to connection %s.", connection_id)
        return False

    return True
