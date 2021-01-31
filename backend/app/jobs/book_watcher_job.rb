# frozen_string_literal: true

class BookWatcherJob < ApplicationJob
  queue_as :book_watchers

  def perform(book)
    book.update(last_sync_at: DateTime.now)
    @spider_result = BookStatusSpider.process(book.title)
  end
end
