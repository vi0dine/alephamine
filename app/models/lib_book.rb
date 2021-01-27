# frozen_string_literal: true

class LibBook < ApplicationRecord
  belongs_to :book
  has_many :watched_books, through: :book
  validates_uniqueness_of :loan_link, :barcode

  enum status: %i[available loaned quarantined]

  after_update :send_notifications

  def send_notifications
    if saved_change_to_status? && status.available?
      # SEND NOTIFICATIONS
    end
  end

  def watchers
    watched_books.map(&:user)
  end

  def self.parse_status(status, loan_link)
    text = status&.strip

    if text == 'Do korzystania w czytelni'
      "loaned"
    elsif text == 'Do wypożyczenia' && loan_link
      "available"
    elsif text == 'Kwarantanna'
      "quarantined"
    else
      "loaned"
    end
  end
end
