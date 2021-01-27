# frozen_string_literal: true

class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books, id: :uuid do |t|
      t.string :title, null: false
      t.integer :year
      t.integer :amount, null: false, default: 0
      t.timestamps
    end

    add_index :books, %i[title year], unique: true
  end
end
