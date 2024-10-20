resource "aws_s3_bucket" "ui" {
  bucket = local.ui_domain
}

resource "aws_s3_bucket_cors_configuration" "ui" {
  bucket = aws_s3_bucket.ui.id

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["http://${local.ui_domain}", "https://${local.ui_domain}"]
    expose_headers  = []
    max_age_seconds = 3600
  }
}

resource "aws_s3_bucket_ownership_controls" "ui" {
  bucket = aws_s3_bucket.ui.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "ui" {
  depends_on = [aws_s3_bucket_ownership_controls.ui]

  bucket = aws_s3_bucket.ui.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "ui" {
  bucket = aws_s3_bucket.ui.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "ui" {
  depends_on = [aws_s3_bucket_public_access_block.ui]
  bucket     = aws_s3_bucket.ui.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.ui.id}/*"
        }
      ]
    }
  )
}

resource "aws_s3_bucket_website_configuration" "ui" {
  bucket = aws_s3_bucket.ui.id

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}
