# frozen_string_literal: true

class WatchedBook < ApplicationRecord
  belongs_to :user
  belongs_to :book
end
