# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_210_127_191_539) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'pgcrypto'
  enable_extension 'plpgsql'
  enable_extension 'uuid-ossp'

  create_table 'books', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'title', null: false
    t.integer 'year'
    t.integer 'amount', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index %w[title year], name: 'index_books_on_title_and_year', unique: true
  end

  create_table 'lib_books', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'loan_link'
    t.string 'barcode', null: false
    t.datetime 'due_datetime'
    t.integer 'loan_status', default: 0, null: false
    t.uuid 'book_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['barcode'], name: 'index_lib_books_on_barcode', unique: true
    t.index ['book_id'], name: 'index_lib_books_on_book_id'
    t.index ['loan_link'], name: 'index_lib_books_on_loan_link', unique: true
  end

  create_table 'oauth_access_grants', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'resource_owner_id', null: false
    t.uuid 'application_id', null: false
    t.string 'token', null: false
    t.integer 'expires_in', null: false
    t.text 'redirect_uri', null: false
    t.datetime 'created_at', null: false
    t.datetime 'revoked_at'
    t.string 'scopes', default: '', null: false
    t.index ['application_id'], name: 'index_oauth_access_grants_on_application_id'
    t.index ['token'], name: 'index_oauth_access_grants_on_token', unique: true
  end

  create_table 'oauth_access_tokens', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'resource_owner_id'
    t.uuid 'application_id'
    t.string 'token', null: false
    t.string 'refresh_token'
    t.integer 'expires_in'
    t.datetime 'revoked_at'
    t.datetime 'created_at', null: false
    t.string 'scopes'
    t.string 'previous_refresh_token', default: '', null: false
    t.index ['application_id'], name: 'index_oauth_access_tokens_on_application_id'
    t.index ['refresh_token'], name: 'index_oauth_access_tokens_on_refresh_token', unique: true
    t.index ['token'], name: 'index_oauth_access_tokens_on_token', unique: true
  end

  create_table 'oauth_applications', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'name', null: false
    t.string 'uid', null: false
    t.string 'secret', null: false
    t.text 'redirect_uri', null: false
    t.string 'scopes', default: '', null: false
    t.boolean 'confidential', default: true, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['uid'], name: 'index_oauth_applications_on_uid', unique: true
  end

  create_table 'users', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.string 'email', null: false
    t.string 'password_digest', null: false
    t.integer 'account_type', default: 0, null: false
    t.integer 'role', default: 0, null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['email'], name: 'index_users_on_email', unique: true
  end

  create_table 'watched_books', id: :uuid, default: -> { 'gen_random_uuid()' }, force: :cascade do |t|
    t.uuid 'user_id', null: false
    t.uuid 'book_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['book_id'], name: 'index_watched_books_on_book_id'
    t.index %w[user_id book_id], name: 'index_watched_books_on_user_id_and_book_id', unique: true
    t.index ['user_id'], name: 'index_watched_books_on_user_id'
  end

  add_foreign_key 'oauth_access_grants', 'oauth_applications', column: 'application_id'
  add_foreign_key 'oauth_access_grants', 'users', column: 'resource_owner_id'
  add_foreign_key 'oauth_access_tokens', 'oauth_applications', column: 'application_id'
  add_foreign_key 'oauth_access_tokens', 'users', column: 'resource_owner_id'
end
