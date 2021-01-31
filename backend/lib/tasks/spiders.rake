# frozen_string_literal: true

namespace :spiders do
  task crawl: :environment do
    pp "Started scheduled spiders at: #{DateTime.now}"
    @books = WatchedBook.all.map(&:book).uniq
    pp 'Crawling...'
    @books.each do |book|
      BookWatcherJob.perform_later(book)
      sleep 90.seconds
    end
  end
end
