terraform {
  backend "s3" {
    bucket = "maingot-infra"
    key    = "terraform-sudoku"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.72"
    }

    github = {
      source  = "integrations/github"
      version = "~> 6.3"
    }
  }
}

locals {
  aws_region       = "us-east-1"
  log_rention_days = 30

  resource_prefix = "sudoku-${var.environment}"
  domain_prefix   = "sudoku${var.environment == "prod" ? "" : "-${var.environment}"}"
  app_domain      = "${local.domain_prefix}.${var.base_domain}"

  api_domain  = "api-${local.app_domain}"
  ws_domain   = "ws-${local.app_domain}"
  ui_domain   = local.app_domain
  auth_domain = "signin-${local.app_domain}"

  github_owner      = "amaingot"
  github_repository = "sudoku"

  tags = {
    environment = var.environment
    application = "sudoku"
  }
}

provider "aws" {
  region = local.aws_region
  default_tags {
    tags = local.tags
  }
}

provider "archive" {}

provider "github" {
  owner = local.github_owner
}
