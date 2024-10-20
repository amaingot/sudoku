from aws_lambda_powertools.utilities.typing import LambdaContext
from api.utils.logging import logger
from api.data import users


def handle_pre_sign_up_event(event: dict, context: LambdaContext):
    logger.info("Received PreSignUp event")
    return event


def handle_token_generation_event(event: dict, context: LambdaContext):
    logger.info("Received TokenGeneration event")
    return event


def handle_post_confirmation_event(event: dict, context: LambdaContext):
    logger.info("Received PostConfirmation event")
    return event


def handle_email_sender_signup(event: dict, context: LambdaContext):
    logger.info("Received CustomEmailSender_SignUp event")
    return event


def handle_pre_auth_event(event: dict, context: LambdaContext):
    logger.info("Received PreAuth event")
    user_id = event.get("request", {}).get("userAttributes", {}).get("sub", "")
    email = event.get("request", {}).get("userAttributes", {}).get("email", "")
    first_name = event.get("request", {}).get(
        "userAttributes", {}).get("given_name", "")
    last_name = event.get("request", {}).get(
        "userAttributes", {}).get("family_name", "")

    # Get user from DynamoDB
    user = users.get(user_id)

    # Create new user if it doesn't exist
    if not user:
        logger.info("User not found, creating new user")
        user = users.create({
            "user_id": user_id,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": "",
            "sign_up_code": None,
        })

    # Update user information if it has changed
    elif user["first_name"] != first_name or user["last_name"] != last_name:
        logger.info("Updating user information")
        users.update({
            **user,
            "first_name": first_name,
            "last_name": last_name,
        })

    return event


def handle_auth_event(event: dict, context: LambdaContext):
    event_type = event.get("triggerSource")
    logger.info(f"Received event: {event_type}")

    if event_type == "PreSignUp_SignUp":
        handle_pre_sign_up_event(event, context)
    elif event_type == "TokenGeneration_HostedAuth":
        handle_token_generation_event(event, context)
    elif event_type == "PostConfirmation_ConfirmSignUp":
        handle_post_confirmation_event(event, context)
    elif event_type == "CustomEmailSender_SignUp":
        handle_email_sender_signup(event, context)
    elif event_type == "PreAuthentication_Authentication":
        handle_pre_auth_event(event, context)
    else:
        logger.warning(f"Unhandled auth event: {event_type}")

    logger.info("Finished handling event")

    return event
