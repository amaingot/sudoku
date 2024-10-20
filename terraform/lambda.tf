data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "${local.resource_prefix}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
  tags               = local.tags
}

data "aws_iam_policy_document" "lambda_permissions" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
    ]
    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:PutLogEvents",
      "xray:PutTraceSegments",
      "xray:PutTelemetryRecords"
    ]
    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "dynamodb:*",
    ]
    resources = [
      aws_dynamodb_table.websocket_connections.arn,
      "${aws_dynamodb_table.websocket_connections.arn}/index/*",
      aws_dynamodb_table.sudoku_games.arn,
      "${aws_dynamodb_table.sudoku_games.arn}/index/*",
      aws_dynamodb_table.users.arn,
      "${aws_dynamodb_table.users.arn}/index/*",
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "execute-api:*",
    ]
    resources = [
      aws_apigatewayv2_api.ws.execution_arn,
      "${aws_apigatewayv2_api.ws.execution_arn}/*/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "cognito-idp:*"
    ]
    resources = [aws_cognito_user_pool.app.arn]
  }
}

resource "aws_iam_role_policy" "lambda_permissions" {
  name   = "${local.resource_prefix}-lambda-permissions"
  role   = aws_iam_role.lambda_role.id
  policy = data.aws_iam_policy_document.lambda_permissions.json
}

locals {
  lambda_env_without_auth = {
    ENV                  = "${var.environment}"
    SHA                  = "${var.sha}"
    POWERTOOLS_LOG_LEVEL = "INFO"

    API_DOMAIN = "${local.api_domain}"
    UI_DOMAIN  = "${local.ui_domain}"
    WS_DOMAIN  = "${local.ws_domain}"

    WS_APIGATEWAY_ENDPOINT = "https://${aws_apigatewayv2_api.ws.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_apigatewayv2_stage.ws.name}/"

    WS_CONNECTIONS_DYNAMODB_TABLE = "${aws_dynamodb_table.websocket_connections.name}"
    SUDOKU_GAMES_DYNAMODB_TABLE   = "${aws_dynamodb_table.sudoku_games.name}"
    USERS_DYNAMODB_TABLE          = "${aws_dynamodb_table.users.name}"
  }

  lambda_env_with_auth = {
    AUTH_DOMAIN             = "${aws_cognito_user_pool_domain.app.domain}"
    AUTH_CLIENT_ID          = "${aws_cognito_user_pool_client.ui_client.id}"
    AUTH_USER_POOL_ENDPOINT = "${aws_cognito_user_pool.app.endpoint}"
    AUTH_USER_POOL_ID       = "${aws_cognito_user_pool.app.id}"
  }

  lambda_env = merge(local.lambda_env_without_auth, local.lambda_env_with_auth)
}

## Layer

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../api"
  output_path = "../lambda.zip"
}

resource "aws_lambda_layer_version" "layer" {
  layer_name          = "${local.resource_prefix}-layer"
  filename            = data.archive_file.lambda.output_path
  compatible_runtimes = ["python3.12"]

  lifecycle {
    ignore_changes = [filename]
  }
}

## API Lambda Function

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${aws_lambda_function.api.function_name}"
  retention_in_days = local.log_rention_days
  tags              = local.tags
}

resource "aws_lambda_function" "api" {
  function_name = "${local.resource_prefix}-api"
  role          = aws_iam_role.lambda_role.arn
  tags          = local.tags
  memory_size   = 512
  timeout       = 30

  filename = data.archive_file.lambda.output_path
  runtime  = "python3.12"
  handler  = "api.lambda.http_handler"
  layers   = [aws_lambda_layer_version.layer.arn]

  tracing_config {
    mode = "PassThrough"
  }

  environment {
    variables = merge(
      local.lambda_env,
      {
        POWERTOOLS_SERVICE_NAME = "${local.resource_prefix}-api"
      }
    )
  }

  lifecycle {
    ignore_changes = [filename, layers]
  }
}

## WS Lambda Function

resource "aws_cloudwatch_log_group" "lambda_ws" {
  name              = "/aws/lambda/${aws_lambda_function.ws.function_name}"
  retention_in_days = local.log_rention_days
  tags              = local.tags
}

resource "aws_lambda_function" "ws" {
  function_name = "${local.resource_prefix}-ws"
  role          = aws_iam_role.lambda_role.arn
  tags          = local.tags
  memory_size   = 512
  timeout       = 30

  filename = data.archive_file.lambda.output_path
  runtime  = "python3.12"
  handler  = "api.lambda.ws_handler"
  layers   = [aws_lambda_layer_version.layer.arn]

  tracing_config {
    mode = "PassThrough"
  }

  environment {
    variables = merge(
      local.lambda_env,
      {
        POWERTOOLS_SERVICE_NAME = "${local.resource_prefix}-ws",
      }
    )
  }

  lifecycle {
    ignore_changes = [filename, layers]
  }
}

## Auth Lambda Function

resource "aws_cloudwatch_log_group" "lambda_auth" {
  name              = "/aws/lambda/${aws_lambda_function.auth.function_name}"
  retention_in_days = local.log_rention_days
  tags              = local.tags
}

resource "aws_lambda_function" "auth" {
  function_name = "${local.resource_prefix}-auth"
  role          = aws_iam_role.lambda_role.arn
  tags          = local.tags
  memory_size   = 512
  timeout       = 30

  filename = data.archive_file.lambda.output_path
  runtime  = "python3.12"
  handler  = "api.lambda.auth_handler"
  layers   = [aws_lambda_layer_version.layer.arn]

  tracing_config {
    mode = "PassThrough"
  }

  environment {
    variables = merge(
      local.lambda_env_without_auth,
      {
        POWERTOOLS_SERVICE_NAME = "${local.resource_prefix}-auth",
      }
    )
  }

  lifecycle {
    ignore_changes = [filename, layers]
  }
}

resource "aws_lambda_permission" "auth" {
  statement_id  = "AllowCognitoIDP"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.auth.function_name
  principal     = "cognito-idp.amazonaws.com"

  source_arn = aws_cognito_user_pool.app.arn
}
