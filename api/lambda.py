from mangum import Mangum
from api.app import app
from api.utils.logging import log_event, logger
from api.realtime.handlers import ws_lambda_handler
from api.auth.handler import handle_auth_event

http_lambda_handler = Mangum(app, lifespan="off")


@logger.inject_lambda_context
def http_handler(event: dict, context):
    log_event(event, context)
    return http_lambda_handler(event, context)


@logger.inject_lambda_context
def ws_handler(event: dict, context):
    log_event(event, context)

    return ws_lambda_handler(event, context)


@logger.inject_lambda_context
def auth_handler(event: dict, context):
    log_event(event, context)

    return handle_auth_event(event, context)
