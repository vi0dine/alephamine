# frozen_string_literal: true

json.book do
  json.id @book.id
  json.title @book.title
  json.year @book.year
  json.updated_at @book.updated_at
  json.books_count @book.lib_books.count
  json.loan_status @book.status
end
