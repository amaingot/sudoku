from typing import TypedDict
from ariadne import convert_kwargs_to_snake_case

from api.graphql.context import ResolverInfo
from api.data import users
from api.utils import cognito
from api.utils.logging import logger


class SignUpInput(TypedDict):
    first_name: str
    last_name: str
    email: str
    password: str
    phone_number: str


@convert_kwargs_to_snake_case
def sign_up(_, info: ResolverInfo, input: SignUpInput):
    logger.info("signing up account")

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

    # sendgrid.send_welcome_email(
    #     email=input['email'],
    #     confirm_link=f"{config.ui_host}/signup/confirm?userId={username}&code={sign_up_code}",
    #     name=input['first_name']
    # )

    return user


class ConfirmAccountInput(TypedDict):
    user_id: str
    code: str


@convert_kwargs_to_snake_case
def confirm_sign_up(_, info: ResolverInfo, input: ConfirmAccountInput):
    logger.info("confirming account")

    user = users.get(input['user_id'])
    if not user:
        raise Exception("User not found")

    if user["sign_up_code"] != input["code"]:
        raise Exception("Invalid sign up code")

    cognito.confirm_sign_up(username=user['user_id'])

    return True
