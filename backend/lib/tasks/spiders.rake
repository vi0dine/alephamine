# frozen_string_literal: true

namespace :spiders do
  task crawl: :environment do
    @books = WatchedBook.all.map(&:book).uniq
    pp 'Crawling...'
    @books.each do |book|
      BookWatcherJob.perform_later(book)
    end
  end
end
