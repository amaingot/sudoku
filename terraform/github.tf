resource "github_repository_environment" "repo_environment" {
  repository  = data.github_repository.repo.name
  environment = var.environment
}

resource "github_actions_environment_variable" "lambda_layer_name" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "LAMBDA_LAYER_NAME"
  value         = aws_lambda_layer_version.layer.layer_name
}

resource "github_actions_environment_variable" "api_lambda_name" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "API_LAMBDA_NAME"
  value         = aws_lambda_function.api.function_name
}

resource "github_actions_environment_variable" "ws_lambda_name" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "WS_LAMBDA_NAME"
  value         = aws_lambda_function.ws.function_name
}

resource "github_actions_environment_variable" "auth_lambda_name" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "AUTH_LAMBDA_NAME"
  value         = aws_lambda_function.auth.function_name
}

resource "github_actions_environment_variable" "ui_s3_bucket" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "UI_S3_BUCKET"
  value         = aws_s3_bucket.ui.bucket
}

resource "github_actions_environment_variable" "cloudfront_distribution_id" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "CLOUDFRONT_DISTRIBUTION_ID"
  value         = aws_cloudfront_distribution.ui.id
}

resource "github_actions_environment_variable" "ui_domain" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "UI_DOMAIN"
  value         = local.ui_domain
}

resource "github_actions_environment_variable" "api_domain" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "API_DOMAIN"
  value         = local.api_domain
}

resource "github_actions_environment_variable" "ws_domain" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "WS_DOMAIN"
  value         = local.ws_domain
}

resource "github_actions_environment_variable" "auth_domain" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "AUTH_DOMAIN"
  value         = local.auth_domain
}

resource "github_actions_environment_variable" "auth_client_id" {
  repository    = data.github_repository.repo.name
  environment   = github_repository_environment.repo_environment.environment
  variable_name = "AUTH_CLIENT_ID"
  value         = aws_cognito_user_pool_client.ui_client.id
}
