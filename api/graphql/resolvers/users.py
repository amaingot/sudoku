from typing import Optional, TypedDict
from ariadne import convert_kwargs_to_snake_case

from api.graphql.context import ResolverInfo
from api.data import users
from api.utils import cognito
from api.utils.logging import logger


@convert_kwargs_to_snake_case
def get_user_id(parent: users.User, info: ResolverInfo):
    logger.info("resolving user id")
    return parent['user_id']


@convert_kwargs_to_snake_case
def get_me(_, info: ResolverInfo):
    logger.info("getting me")
    user = info.context.get_user()
    return user


@convert_kwargs_to_snake_case
def get_user(parent, info: ResolverInfo, **kwargs):
    id: Optional[str] = kwargs.get('id')
    logger.info("getting user id %s", id)

    if info.context.user_id != id:
        info.context.assert_admin()

    if isinstance(parent, dict) and 'user_id' in parent and isinstance(parent['user_id'], str):
        id = parent['user_id']

    if not id:
        return None

    user = users.get(id)
    return user


class ListUsersInput(TypedDict):
    limit: Optional[int]
    next_token: Optional[str]


@convert_kwargs_to_snake_case
def list_users(_, info: ResolverInfo, input: ListUsersInput):
    logger.info("listing users")
    info.context.assert_admin()

    limit: int = input["limit"] or 25
    next_token = input.get('next_token', None)

    users_list = users.list(limit=limit, next_token=next_token)

    return users_list


class CreateUserInput(TypedDict):
    first_name: str
    last_name: str
    email: str
    password: str
    phone_number: str


@convert_kwargs_to_snake_case
def create_user(_, info: ResolverInfo, input: CreateUserInput):
    logger.info("creating user, email %s", input['email'])
    info.context.assert_admin()

    cognito_user = None
    try:
        cognito_user = cognito.sign_up(
            email=input['email'],
            password=input['password'],
            first_name=input['first_name'],
            last_name=input['last_name']
        )
    except Exception as e:
        logger.error("error creating cognito cognito_user %s", e)
        raise Exception("Error creating cognito cognito_user") from e

    user_id = cognito_user.get("Username", "")
    sign_up_code = "000000"
    user = None

    # create user in dynamodb
    try:
        user = users.create({
            "user_id": user_id,
            "first_name": input['first_name'],
            "last_name": input['last_name'],
            "email": input['email'],
            "phone_number": input['phone_number'],
            "sign_up_code": sign_up_code,
        })
    except Exception as e:
        logger.error("error creating user %s", e)
        cognito.delete_user(username=user_id)
        raise Exception("Error creating user") from e

    return user


class UpdateUserInput(TypedDict):
    id: str
    first_name: str
    last_name: str
    phone_number: str
    password: Optional[str]


@convert_kwargs_to_snake_case
def update_user(_, info: ResolverInfo, input: UpdateUserInput):
    logger.info("updating user, user id: %s", input['id'])
    info.context.assert_admin()

    user = users.get(input['id'])

    if not user:
        raise Exception("User not found")

    new_user = users.update({
        **user,
        "first_name": input['first_name'],
        "last_name": input['last_name'],
        "phone_number": input['phone_number'],
    })

    if input['password']:
        cognito.change_password(
            username=user['email'],
            password=input['password']
        )

    return new_user


@convert_kwargs_to_snake_case
def delete_user(_, info: ResolverInfo, id: str):
    logger.info("deleting user, user id: %s", id)
    info.context.assert_admin()

    user = users.get(id)

    if not user:
        raise Exception("User not found")

    cognito.delete_user(username=user['email'])
    users.delete(id)
    return True
