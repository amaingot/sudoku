from ariadne.asgi import GraphQL
from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from api.graphql.schema import schema
from api.graphql.context import get_context_value
from api.utils.logging import logger
from api.endpoints import version
from api.config import config


def shutdown_task():
    logger.info("Shutting down")


origins = [
    f"https://{config.api_domain}",
    f"http://{config.api_domain}",
    config.api_domain,
    f"https://{config.ui_domain}",
    f"http://{config.ui_domain}",
    config.ui_domain,
]

logger.info(f"Allowed origins: {', '.join(origins)}")


middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    ),
]


graphql = GraphQL(
    schema,
    debug=True,
    context_value=get_context_value,
)

routes = [
    Route("/version", endpoint=version.get_version, methods=["GET"]),
    Mount("/graphql", app=graphql),
]

app = Starlette(
    debug=True, on_shutdown=[shutdown_task], middleware=middleware, routes=routes
)
