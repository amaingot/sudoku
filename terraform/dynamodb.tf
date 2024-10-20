resource "aws_dynamodb_table" "websocket_connections" {
  name         = "${local.resource_prefix}-ws-connections"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "connection_id"
  tags         = local.tags

  global_secondary_index {
    name            = "user_id-index"
    hash_key        = "user_id"
    projection_type = "ALL"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "connection_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "sudoku_games" {
  name         = "${local.resource_prefix}-sudoku-games"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "game_id"
  tags         = local.tags

  global_secondary_index {
    name            = "user_id-index"
    hash_key        = "user_id"
    projection_type = "ALL"
  }

  attribute {
    name = "game_id"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "users" {
  name         = "${local.resource_prefix}-users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  tags         = local.tags

  attribute {
    name = "user_id"
    type = "S"
  }
}
