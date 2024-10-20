
resource "aws_apigatewayv2_api" "api" {
  name          = "${local.resource_prefix}-api"
  protocol_type = "HTTP"
  tags          = local.tags

  cors_configuration {
    allow_headers = ["*"]
    allow_methods = ["*"]
    allow_origins = [
      "https://${local.ui_domain}",
      "http://localhost:5173",
    ]
    allow_credentials = "true"
  }
}

resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = "/aws/apigatewayv2/${aws_apigatewayv2_api.api.name}"
  retention_in_days = local.log_rention_days
  tags              = local.tags
}

resource "aws_apigatewayv2_stage" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "main"
  auto_deploy = true
  tags        = local.tags


  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format = jsonencode(
      {
        httpMethod     = "$context.httpMethod"
        ip             = "$context.identity.sourceIp"
        protocol       = "$context.protocol"
        requestId      = "$context.requestId"
        requestTime    = "$context.requestTime"
        responseLength = "$context.responseLength"
        routeKey       = "$context.routeKey"
        status         = "$context.status"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "api" {
  api_id = aws_apigatewayv2_api.api.id

  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.api.invoke_arn
}

resource "aws_lambda_permission" "api" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = local.api_domain
  tags        = local.tags

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.app.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.api.id
}

# Routes

locals {
  api_routes = [
    "GET /version",
    "POST /graphql",
    "GET /graphql",
    "POST /graphql/{proxy+}",
    "GET /graphql/{proxy+}",
  ]
}

resource "aws_apigatewayv2_route" "api" {
  for_each  = toset(local.api_routes)
  api_id    = aws_apigatewayv2_api.api.id
  route_key = each.value
  target    = "integrations/${aws_apigatewayv2_integration.api.id}"
}
