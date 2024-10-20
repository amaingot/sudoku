resource "github_repository_environment" "repo_environment" {
  repository  = data.github_repository.repo.name
  environment = var.environment
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
