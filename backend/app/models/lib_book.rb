# frozen_string_literal: true

# == Schema Information
#
# Table name: lib_books
#
#  id           :uuid             not null, primary key
#  barcode      :string           not null
#  due_datetime :datetime
#  loan_link    :string
#  loan_status  :integer          default("available"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  book_id      :uuid             not null
#
# Indexes
#
#  index_lib_books_on_barcode    (barcode) UNIQUE
#  index_lib_books_on_book_id    (book_id)
#  index_lib_books_on_loan_link  (loan_link) UNIQUE
#
class LibBook < ApplicationRecord
  belongs_to :book
  has_many :watched_books, through: :book
  validates_uniqueness_of :loan_link, :barcode, allow_nil: true

  enum loan_status: %i[available loaned quarantined]

  after_update :send_notifications
  after_create do |libbook|
    libbook.book.increment!(:amount)
  end

  def send_notifications
    if saved_change_to_attribute?(:loan_status) && available?
      bronzes = watchers&.select { |user| user.bronze? }
      silvers = watchers&.select { |user| user.silver? }
      golds = watchers&.select { |user| user.gold? }

      PushNotifierJob.set(wait: 30.seconds).perform_later(bronzes, book) if bronzes.count.positive?
      PushNotifierJob.set(wait: 15.seconds).perform_later(silvers, book) if silvers.count.positive?
      PushNotifierJob.perform_now(golds, book) if golds.count.positive?
    end
  end

  def watchers
    watched_books.map(&:user)
  end

  def self.parse_status(status, loan_link)
    text = status&.strip

    if text == 'Do korzystania w czytelni'
      :loaned
    elsif text == 'Do wypożyczenia' && loan_link
      :available
    elsif text == 'Kwarantanna'
      :quarantined
    else
      :loaned
    end
  end
end
