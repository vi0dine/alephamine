# frozen_string_literal: true

class CreateLibBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :lib_books, id: :uuid do |t|
      t.string :loan_link
      t.string :barcode, null: false
      t.datetime :due_datetime
      t.integer :loan_status, null: false, default: 0
      t.belongs_to :book, null: false, type: :uuid
      t.timestamps
    end

    add_index :lib_books, :loan_link, unique: true
    add_index :lib_books, :barcode, unique: true
  end
end
