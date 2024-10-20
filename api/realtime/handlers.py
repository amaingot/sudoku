from aws_lambda_powertools.utilities.typing import LambdaContext
from api.utils.logging import logger
from api.data import ws_connections
from api.utils import auth


def handle_connect(user_id: str, connection_id: str):
    status_code = 200
    ws_connections.create(user_id, connection_id)
    logger.info("Added connection %s for user %s.", connection_id, user_id)
    return status_code


def handle_disconnect(connection_id: str):
    status_code = 200
    ws_connections.delete(connection_id)
    return status_code


def ws_lambda_handler(event: dict, context: LambdaContext):
    route_key = event.get("requestContext", {}).get("routeKey")
    connection_id = event.get("requestContext", {}).get("connectionId")

    if route_key is None or connection_id is None:
        return {"statusCode": 400}

    response = {"statusCode": 200}
    if route_key == "$connect":
        logger.info("Handling $connect route.")
        try:
            token_from_header = event.get(
                "headers", {}).get("Authorization", "")
            token_from_query_string = event.get("queryStringParameters", {}).get(
                "token", ""
            )
            token = token_from_header or token_from_query_string

            decoded_token = auth.decode_token(token)
            user_id = decoded_token.sub
            logger.info("User ID: %s", user_id)
            response["statusCode"] = handle_connect(user_id, connection_id)
        except Exception as e:
            logger.error(e)
            response["statusCode"] = 401
    elif route_key == "$disconnect":
        logger.info("Handling $disconnect route.")
        response["statusCode"] = handle_disconnect(connection_id)
    else:
        logger.info("No route found. Returning 404. Route key: %s", route_key)
        response["statusCode"] = 404

    return response
