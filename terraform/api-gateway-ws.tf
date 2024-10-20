resource "aws_apigatewayv2_api" "ws" {
  name                       = "${local.resource_prefix}-ws"
  protocol_type              = "WEBSOCKET"
  tags                       = local.tags
  route_selection_expression = "$request.body.action"
}

resource "aws_cloudwatch_log_group" "api_gateway_ws" {
  name              = "/aws/apigatewayv2/${aws_apigatewayv2_api.ws.name}"
  retention_in_days = local.log_rention_days
  tags              = local.tags
}

resource "aws_apigatewayv2_stage" "ws" {
  api_id      = aws_apigatewayv2_api.ws.id
  name        = "main"
  auto_deploy = true
  tags        = local.tags

  default_route_settings {
    data_trace_enabled       = true
    detailed_metrics_enabled = true
    logging_level            = "INFO"
    throttling_burst_limit   = 5000
    throttling_rate_limit    = 500
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway_ws.arn
    format = jsonencode(
      {
        "requestId"    = "$context.requestId"
        "ip"           = "$context.identity.sourceIp"
        "caller"       = "$context.identity.caller"
        "user"         = "$context.identity.user"
        "requestTime"  = "$context.requestTime"
        "eventType"    = "$context.eventType"
        "routeKey"     = "$context.routeKey"
        "status"       = "$context.status"
        "connectionId" = "$context.connectionId"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "ws" {
  api_id             = aws_apigatewayv2_api.ws.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.ws.invoke_arn
}

resource "aws_lambda_permission" "ws" {
  statement_id  = "AllowExecutionFromAPIGatewayWS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ws.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.ws.execution_arn}/*/*"
}

resource "aws_apigatewayv2_domain_name" "ws" {
  domain_name = local.ws_domain
  tags        = local.tags

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.app.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "ws" {
  api_id      = aws_apigatewayv2_api.ws.id
  domain_name = aws_apigatewayv2_domain_name.ws.id
  stage       = aws_apigatewayv2_stage.ws.id
}

# Routes

locals {
  ws_api_routes = [
    "$connect",
    "$disconnect",
    "$default",
  ]
}

resource "aws_apigatewayv2_route" "ws" {
  for_each  = toset(local.ws_api_routes)
  api_id    = aws_apigatewayv2_api.ws.id
  route_key = each.value
  target    = "integrations/${aws_apigatewayv2_integration.ws.id}"
}
