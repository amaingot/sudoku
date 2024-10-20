from ariadne import convert_kwargs_to_snake_case
from api.utils.logging import logger
from api.graphql.context import ResolverInfo


@convert_kwargs_to_snake_case
def resolve_ping(_, info: ResolverInfo):
    logger.info("Got a ping!")

    return True


@convert_kwargs_to_snake_case
def resolve_pong(_, info: ResolverInfo):
    logger.info("Got a pong!")

    return True
