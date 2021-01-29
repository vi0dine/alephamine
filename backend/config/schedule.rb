# frozen_string_literal: true

set :output, 'log/cron_log.log'
set :environment, 'development'

every 20.minutes do
  rake 'spiders:crawl'
end
