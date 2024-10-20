# Data sources

data "github_repository" "repo" {
  full_name = "${local.github_owner}/${local.github_repository}"
}

data "aws_region" "current" {}

data "aws_acm_certificate" "app" {
  domain = var.base_domain
  types  = ["AMAZON_ISSUED"]
}

data "aws_route53_zone" "primary" {
  name = var.base_domain
}

data "aws_ses_email_identity" "no_reply" {
  email = "no-reply@${var.base_domain}"
}
