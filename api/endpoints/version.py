from starlette.responses import JSONResponse
from starlette.requests import Request

from api.config import config


def get_version(_: Request):
    version = {"sha": config.sha, "env": config.env}
    return JSONResponse(version)
