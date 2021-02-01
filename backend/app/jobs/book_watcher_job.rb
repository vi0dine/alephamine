# frozen_string_literal: true

class BookWatcherJob < ApplicationJob
  queue_as :book_watchers

  after_perform do |job|
    puts "\n\n"
    temp_book = Book.where('title = ? AND year IS NULL AND amount = 0', job.arguments.first.title)&.first
    temp_book&.users&.each do |watcher|
      pp "Assigning founded books to user: #{watcher.email}:"
      pp "Searching for books with title #{temp_book.title} and id different than #{temp_book.id}"
      Book.same_titled(temp_book.id, temp_book.title).each_with_index do |book, index|
        pp "#{index}. #{book.title} - #{book.year}"
        WatchedBook.find_or_create_by!(user: watcher, book: book)
      end
    end
    pp 'Destroying initial book...'
    temp_book&.destroy!
    puts "\n\n"
  end

  def perform(book)
    @spider_result = BooksSpider.new(book).scrape
  end
end
