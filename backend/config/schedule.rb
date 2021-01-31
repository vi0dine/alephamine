# frozen_string_literal: true

set :output, 'log/cron.log'
set :environment, 'production'

ENV.each { |k, v| env(k, v) }

every 20.minutes do
  rake 'spiders:crawl'
end
