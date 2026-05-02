terraform {
  backend "s3" {
    bucket = "maingot-infra"
    key    = "terraform-sudoku"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.43"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.12"
    }
  }
}

locals {
  aws_region       = "us-east-1"
  log_rention_days = 30

  resource_prefix = "sudoku-${var.environment}"
  domain_prefix   = "sudoku${var.environment == "prod" ? "" : "-${var.environment}"}"
  app_domain      = "${local.domain_prefix}.${var.base_domain}"

  api_domain = "api-${local.app_domain}"
  ws_domain  = "ws-${local.app_domain}"
  ui_domain  = local.app_domain

  # Cognito hosted UI uses the default AWS-issued domain. The prefix must be
  # globally unique per region.
  auth_domain_prefix = "maingot-sudoku-${var.environment}"
  auth_domain        = "${aws_cognito_user_pool_domain.app.domain}.auth.${data.aws_region.current.region}.amazoncognito.com"

  github_owner      = "amaingot"
  github_repository = "sudoku"

  default_tags = {
    Project     = "sudoku"
    Environment = "${var.environment}"
    Repository  = "github.com/${local.github_owner}/${local.github_repository}"
  }
}

provider "aws" {
  region = local.aws_region
  default_tags {
    tags = local.default_tags
  }
}

resource "aws_servicecatalogappregistry_application" "app" {
  name        = "sudoku-${var.environment}"
  description = "Sudoku (${var.environment})"
}

locals {
  tags = merge(
    local.default_tags,
    aws_servicecatalogappregistry_application.app.application_tag
  )
}


provider "archive" {}

provider "github" {
  owner = local.github_owner
}
