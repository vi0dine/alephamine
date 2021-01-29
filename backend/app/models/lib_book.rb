# frozen_string_literal: true

class LibBook < ApplicationRecord
  belongs_to :book
  has_many :watched_books, through: :book
  validates_uniqueness_of :loan_link, :barcode

  enum loan_status: %i[available loaned quarantined]

  after_update :send_notifications

  def send_notifications
    if saved_change_to_attribute?(:loan_status) && available?
      bronzes = watchers&.select { |user| user.bronze? }
      silvers = watchers&.select { |user| user.silver? }
      golds = watchers&.select { |user| user.gold? }

      PushNotifierJob.set(wait: 30.seconds).perform_later(bronzes, book) if bronzes.count
      PushNotifierJob.set(wait: 15.seconds).perform_later(silvers, book) if silvers.count
      PushNotifierJob.perform_now(golds, book) if golds.count
    end
  end

  def watchers
    watched_books.map(&:user)
  end

  def self.parse_status(status, loan_link)
    text = status&.strip

    if text == 'Do korzystania w czytelni'
      'loaned'
    elsif text == 'Do wypożyczenia' && loan_link
      'available'
    elsif text == 'Kwarantanna'
      'quarantined'
    else
      'loaned'
    end
  end
end
