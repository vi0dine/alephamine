# frozen_string_literal: true

json.books do
  json.array! @books do |book|
    json.id book.id
    json.title book.title
    json.updated_at book.updated_at
    json.books_count book.lib_books.count
    json.loan_status book.status
  end
end
