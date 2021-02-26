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
require 'rails_helper'

RSpec.describe Book, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
