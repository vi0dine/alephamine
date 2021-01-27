# frozen_string_literal: true

class BookWatcherJob < ApplicationJob
  queue_as :book_watchers

  def perform(book)
    @spider_result = BookStatusSpider.process(book.title)
  end
end
