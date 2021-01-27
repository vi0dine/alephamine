# frozen_string_literal: true

class CreateWatchedBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :watched_books, id: :uuid do |t|
      t.belongs_to :user, null: false, type: :uuid
      t.belongs_to :book, null: false, type: :uuid
      t.timestamps
    end

    add_index :watched_books, %i[user_id book_id], unique: true
  end
end
