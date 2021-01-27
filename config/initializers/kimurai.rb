# frozen_string_literal: true

Kimurai.configure do |config|
  # Don't colorize default logger in development mode:
  config.colorize_logger = false

  # Logger level for default logger:
  # config.log_level = :info

  # custom logger (you can use logstash for example with multiple sources):
  # config.logger = Logger.new(STDOUT)

  # Define custom time zone for logs:
  # config.time_zone = "UTC"
  # config.time_zone = "Europe/Moscow"

  # Add custom request errors to retry:
  # config.retry_request_errors += [Net::HTTPBadGateway]
end
