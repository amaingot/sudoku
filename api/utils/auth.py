from functools import cache
import requests
from jwt import PyJWKClient, decode
from api.config import config


class DecodedToken:
    sub: str
    iss: str
    version: int
    client_id: str
    origin_jti: str
    event_id: str
    token_use: str
    scope: str
    auth_time: int
    exp: int
    iat: int
    jti: str
    username: str
    groups: list[str]

    def __init__(self, data: dict):
        self.sub = data.get("sub", "")
        self.iss = data.get("iss", "")
        self.version = data.get("version", "")
        self.client_id = data.get("client_id", "")
        self.origin_jti = data.get("origin_jti", "")
        self.event_id = data.get("event_id", "")
        self.token_use = data.get("token_use", "")
        self.scope = data.get("scope", "")
        self.auth_time = data.get("auth_time", "")
        self.exp = data.get("exp", "")
        self.iat = data.get("iat", "")
        self.jti = data.get("jti", "")
        self.username = data.get("username", "")
        self.groups = data.get("cognito:groups", [])


JWKS_URL = f"https://{config.auth_user_pool_endpoint}/.well-known/jwks.json"
jwks_client = PyJWKClient(uri=JWKS_URL)


def decode_token(token: str) -> DecodedToken:
    return cached_decode_token(token)


@cache
def cached_decode_token(token: str) -> DecodedToken:
    signing_key = jwks_client.get_signing_key_from_jwt(token)
    data = decode(
        token,
        signing_key.key,
        algorithms=["RS256"],
        options={"verify_exp": True},
    )
    return DecodedToken(data)


class UserInfo:
    user_id: str
    sub: str
    email: str
    email_verified: bool
    given_name: str
    family_name: str
    username: str
    employee_id: str
    account_id: str

    def __init__(self, user: dict):
        self.user_id = user.get("sub", "")
        self.sub = user.get("sub", "")
        self.email = user.get("email", "")
        self.email_verified = user.get("email_verified", "")
        self.given_name = user.get("given_name", "")
        self.family_name = user.get("family_name", "")
        self.username = user.get("username", "")
        self.employee_id = user.get("custom:employee_id", "")
        self.account_id = user.get("custom:account_id", "")


def get_user_info(access_token: str) -> UserInfo:
    user_info = cached_get_user_info(access_token)
    return user_info


@cache
def cached_get_user_info(access_token: str) -> UserInfo:
    user_info = requests.get(
        f"https://{config.auth_domain}/oauth2/userInfo",
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=10,
    ).json()
    return UserInfo(user_info)
