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
require 'rails_helper'

RSpec.describe WatchedBook, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
