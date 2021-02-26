# == Schema Information
#
# Table name: books
#
#  id           :uuid             not null, primary key
#  amount       :integer          default(0), not null
#  last_sync_at :datetime
#  searchable   :tsvector
#  title        :string           not null
#  year         :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_books_on_searchable      (searchable) USING gin
#  index_books_on_title_and_year  (title,year) UNIQUE
#
FactoryBot.define do
  factory :book do
    sequence(:title) { |n| Faker::Book.title << n.to_s }
    sequence(:year) { |n| 2000 + n }
    last_sync_at { Faker::Time.backward(days: 3) }
    amount { Faker::Base.rand_in_range(0, 10) }
  end
end
