from functools import cache
import boto3
from mypy_boto3_cognito_idp.type_defs import (
    AttributeTypeTypeDef,
    AdminGetUserResponseTypeDef,
)

from api.utils.logging import logger
from api.config import config

client = boto3.client("cognito-idp")


def update_user_attributes(
    username: str, attributes: list[AttributeTypeTypeDef]
):
    return client.admin_update_user_attributes(
        UserPoolId=config.auth_user_pool_id, Username=username, UserAttributes=attributes
    )


def sign_up(email: str, password: str, first_name: str, last_name: str):
    user_create_response = client.admin_create_user(
        UserPoolId=config.auth_user_pool_id,
        Username=email,
        MessageAction="SUPPRESS",
        UserAttributes=[
            {"Name": "email", "Value": email},
            {"Name": "given_name", "Value": first_name},
            {"Name": "family_name", "Value": last_name},
        ],
        DesiredDeliveryMediums=["EMAIL"],
    )

    client.admin_set_user_password(
        UserPoolId=config.auth_user_pool_id,
        Username=email,
        Password=password,
        Permanent=True
    )
    return user_create_response.get("User")


def delete_user(username: str):
    try:
        client.admin_delete_user(
            UserPoolId=config.auth_user_pool_id, Username=username)
        return True
    except Exception as e:
        logger.error({'error': 'Failed to delete user', 'exception': e})
        return False


def confirm_sign_up(username: str):

    # client.admin_confirm_sign_up(
    #     UserPoolId=config.auth_user_pool_id, Username=username
    # )
    update_user_attributes(
        username=username,
        attributes=[{"Name": "email_verified", "Value": "true"}],
    )


def change_password(username: str, password: str):
    client.admin_set_user_password(
        UserPoolId=config.auth_user_pool_id,
        Username=username,
        Password=password,
        Permanent=True
    )


def get_user_auth(username: str, password: str):
    return client.admin_initiate_auth(
        UserPoolId=config.auth_user_pool_id,
        ClientId=config.auth_client_id,
        AuthFlow="ADMIN_USER_PASSWORD_AUTH",
        AuthParameters={
            "USERNAME": username,
            "PASSWORD": password
        }
    )


@cache
def get_user(username: str) -> AdminGetUserResponseTypeDef:
    return client.admin_get_user(UserPoolId=config.auth_user_pool_id, Username=username)


@cache
def get_user_groups(username: str):
    return client.admin_list_groups_for_user(UserPoolId=config.auth_user_pool_id, Username=username)
