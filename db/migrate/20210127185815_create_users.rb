# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.integer :account_type, null: false, default: 0
      t.integer :role, null: false, default: 0
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
