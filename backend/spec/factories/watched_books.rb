# == Schema Information
#
# Table name: watched_books
#
#  id           :uuid             not null, primary key
#  dismissed_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  book_id      :uuid             not null
#  user_id      :uuid             not null
#
# Indexes
#
#  index_watched_books_on_book_id              (book_id)
#  index_watched_books_on_user_id              (user_id)
#  index_watched_books_on_user_id_and_book_id  (user_id,book_id) UNIQUE
#
FactoryBot.define do
  factory :watched_book do
    book
    user

    trait :dismissed do
      dismissed_at { Faker::Time.backward(days: 10) }
    end
  end
end
