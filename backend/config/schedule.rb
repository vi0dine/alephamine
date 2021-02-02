# frozen_string_literal: true

set :output, 'log/cron.log'
set :environment, 'production'

ENV.each { |k, v| env(k, v) }

every '*/5 8-16 * * *' do
  rake 'spiders:crawl'
end
