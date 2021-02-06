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
FactoryBot.define do
  factory :lib_book do
    book
    loan_status { LibBook.loan_statuses.keys.sample }
    sequence(:loan_link) { |n| Faker::Internet.url << n.to_s }
    sequence(:barcode) { |n| Faker::Lorem.characters(number: 8) << n.to_s }
    due_datetime { Faker::Time.forward(days: 60) }
  end
end
