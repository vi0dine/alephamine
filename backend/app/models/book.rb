# frozen_string_literal: true

class Book < ApplicationRecord
  has_many :lib_books, dependent: :destroy
  has_many :watched_books, dependent: :destroy
  has_many :users, through: :watched_books

  def self.same_titled(id, title)
    if Book.where.not(id: id).where(title: title).blank?
      Book.all.select do |book|
        DamerauLevenshtein.distance(book.title, title) <= 2 && book.id != id
      end
    else
      Book.where.not(id: id).where(title: title)
    end
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
