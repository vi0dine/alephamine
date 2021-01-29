# frozen_string_literal: true

class Book < ApplicationRecord
  has_many :lib_books, dependent: :destroy
  has_many :watched_books, dependent: :destroy

  after_create do |book|
    BookWatcherJob.perform_later(book)
  end

  def status
    if lib_books.any?(&:available?)
      :available
    elsif lib_books.any?(&:quarantined?)
      :quarantined
    else
      :loaned
    end
  end
end
