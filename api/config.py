from os import environ


class Config:
    def __init__(self):
        self.env = f"{environ.get('ENV')}"
        self.sha = f"{environ.get('SHA')}"
        self.aws_region = f"{environ.get('AWS_REGION')}"

        self.ui_domain = f"{environ.get('UI_DOMAIN')}"
        self.api_domain = f"{environ.get('API_DOMAIN')}"
        self.ws_domain = f"{environ.get('WS_DOMAIN')}"

        self.ws_apigateway_endpoint = f"{environ.get('WS_APIGATEWAY_ENDPOINT')}"

        self.ws_connections_dynamodb_table = f"{environ.get('WS_CONNECTIONS_DYNAMODB_TABLE')}"
        self.sudoku_games_dynamodb_table = f"{environ.get('SUDOKU_GAMES_DYNAMODB_TABLE')}"
        self.users_dynamodb_table = f"{environ.get('USERS_DYNAMODB_TABLE')}"

        self.auth_domain = f"{environ.get('AUTH_DOMAIN')}"
        self.auth_client_id = f"{environ.get('AUTH_CLIENT_ID')}"
        self.auth_user_pool_endpoint = f"{environ.get('AUTH_USER_POOL_ENDPOINT')}"
        self.auth_user_pool_id = f"{environ.get('AUTH_USER_POOL_ID')}"


config = Config()
