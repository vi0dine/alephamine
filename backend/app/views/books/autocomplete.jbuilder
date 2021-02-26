# frozen_string_literal: true

json.books do
  json.array! @books do |book|
    json.title book
  end
end
