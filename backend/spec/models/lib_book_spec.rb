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
require 'rails_helper'

RSpec.describe LibBook, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
