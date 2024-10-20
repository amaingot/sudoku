variable "environment" {
  type        = string
  description = "The environment in which the application is deployed"
}

variable "sha" {
  type        = string
  description = "The git sha of the application"
  default     = "local"
}

variable "base_domain" {
  type        = string
  default     = "hmm.dev"
  description = "The domain name for the application"
}
