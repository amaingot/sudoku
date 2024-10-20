resource "aws_cognito_user_pool" "app" {
  name                     = local.resource_prefix
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  mfa_configuration        = "OPTIONAL"
  tags                     = local.tags

  lambda_config {
    # pre_authentication = aws_lambda_function.auth.arn
  }

  admin_create_user_config {
    allow_admin_create_user_only = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = true
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
    source_arn            = data.aws_ses_email_identity.no_reply.arn
  }

  software_token_mfa_configuration {
    enabled = true
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = [
      "email",
    ]
  }

  username_configuration {
    case_sensitive = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "given_name"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "family_name"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }
}

resource "aws_cognito_user_group" "admin" {
  name         = "admins"
  user_pool_id = aws_cognito_user_pool.app.id
  description  = "Back-office admins of the application"
}

resource "aws_cognito_user_pool_domain" "app" {
  domain          = local.auth_domain
  certificate_arn = data.aws_acm_certificate.app.arn
  user_pool_id    = aws_cognito_user_pool.app.id
}

resource "aws_route53_record" "cognito_domain" {
  name            = aws_cognito_user_pool_domain.app.domain
  type            = "A"
  zone_id         = data.aws_route53_zone.primary.zone_id
  allow_overwrite = true

  alias {
    evaluate_target_health = false
    name                   = aws_cognito_user_pool_domain.app.cloudfront_distribution
    zone_id                = aws_cognito_user_pool_domain.app.cloudfront_distribution_zone_id
  }
}

resource "aws_cognito_user_pool_client" "ui_client" {
  name            = "ui-client"
  user_pool_id    = aws_cognito_user_pool.app.id
  generate_secret = false
  callback_urls = [
    "https://${local.ui_domain}/auth/callback",
    "http://localhost:5173/auth/callback",
  ]
  default_redirect_uri = "https://${local.ui_domain}/auth/callback"
  logout_urls = [
    "https://${local.ui_domain}",
    "http://localhost:5173",
  ]

  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "phone", "profile", "aws.cognito.signin.user.admin"]
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows_user_pool_client = true

  read_attributes  = ["email", "email_verified", "given_name", "family_name", "phone_number", "phone_number_verified", "address", "birthdate", "gender", "locale", "middle_name", "name", "nickname", "picture", "preferred_username", "profile", "updated_at", "website", "zoneinfo"]
  write_attributes = ["email", "given_name", "family_name", "phone_number", "address", "birthdate", "gender", "locale", "middle_name", "name", "nickname", "picture", "preferred_username", "profile", "updated_at", "website", "zoneinfo"]
}
