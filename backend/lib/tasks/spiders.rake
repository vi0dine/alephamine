# frozen_string_literal: true

namespace :spiders do
  task crawl: :environment do
    pp 'Crawling...'
    %w[Arytmie Pediatria].each do |title|
      book = Book.create(title: title)
      BookWatcherJob.perform_later(book)
    end
  end
end
