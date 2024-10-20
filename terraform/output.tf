output "ui_domain" {
  value = local.ui_domain
}

output "api_domain" {
  value = local.api_domain
}

output "ws_domain" {
  value = local.ws_domain
}

output "auth_domain" {
  value = aws_cognito_user_pool_domain.app.domain
}

output "ws_apigateway_endpoint" {
  value = "https://${aws_apigatewayv2_api.ws.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_apigatewayv2_stage.ws.name}/"
}

output "ws_connections_dynamodb_table" {
  value = aws_dynamodb_table.websocket_connections.name
}

output "sudokugames_dynamodb_table" {
  value = aws_dynamodb_table.sudoku_games.name
}

output "users_dynamodb_table" {
  value = aws_dynamodb_table.users.name
}

output "auth_client_id" {
  value = aws_cognito_user_pool_client.ui_client.id
}

output "auth_user_pool_endpoint" {
  value = aws_cognito_user_pool.app.endpoint
}

output "auth_user_pool_id" {
  value = aws_cognito_user_pool.app.id
}

output "lambda_layer_name" {
  value = aws_lambda_layer_version.layer.layer_name
}

output "api_lambda_name" {
  value = aws_lambda_function.api.function_name
}

output "ws_lambda_name" {
  value = aws_lambda_function.ws.function_name
}

output "auth_lambda_name" {
  value = aws_lambda_function.auth.function_name
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.ui.id
}

output "ui_s3_bucket" {
  value = aws_s3_bucket.ui.bucket
}

output "deployment_url" {
  value = "https://${local.ui_domain}"
}