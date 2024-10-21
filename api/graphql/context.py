from typing import Optional
from ariadne.types import GraphQLResolveInfo  # type: ignore
from starlette.requests import Request
from api.data import users
from api.utils.auth import decode_token, get_user_info, UserInfo, DecodedToken
from api.utils.logging import logger


class Context:
    request: Request
    token: Optional[str]
    decoded_token: Optional[DecodedToken]
    user_info: Optional[UserInfo]
    user_id: Optional[str]
    user: Optional[users.User]

    def __init__(self, request: Request):
        self.request = request
        self.token = request.headers.get("Authorization", None)
        self.decoded_token = None
        self.user_info = None
        self.user_id = None
        self.user = None

        try:
            if self.token is not None and self.token.startswith("Bearer "):
                self.token = self.token.replace("Bearer ", "")
                self.decoded_token = decode_token(self.token)
                self.user_id = self.decoded_token.sub
        except Exception as e:
            logger.error("Error decoding token: %s", e)

    def init(self):
        if self.token is None:
            return

        try:
            self.user_info = get_user_info(self.token)
        except Exception as e:
            logger.error("Error getting user info: %s", e)

    def get_auth(self) -> DecodedToken:
        if self.decoded_token is None:
            raise Exception("User not logged in")
        return self.decoded_token

    def get_user_info(self) -> UserInfo:
        if self.user_info is None:
            raise Exception("User not logged in")
        return self.user_info

    def get_user(self) -> users.User:
        if self.user_id is None:
            raise Exception("User not logged in")

        if self.user is None:
            self.user = users.get(self.user_id)

        if self.user is None:
            raise Exception("User is not found")
        return self.user

    def is_admin(self) -> bool:
        if not self.decoded_token:
            return False
        if not self.decoded_token.groups:
            return False
        return "admins" in self.decoded_token.groups

    def assert_admin(self):
        if not self.is_admin():
            raise Exception("User is not an admin")

    def assert_user(self):
        if self.user_id is None:
            raise Exception("User not logged in")


def get_context_value(request: Request) -> Context:
    context = Context(request)
    context.init()
    return context


class ResolverInfo(GraphQLResolveInfo):
    context: Context  # type: ignore
