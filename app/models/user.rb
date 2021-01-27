# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  enum role: %i[user admin]
  enum account_type: %i[bronze silver gold]

  has_many :watched_books, dependent: :destroy

  has_many :access_grants,
           class_name: 'Doorkeeper::AccessGrant',
           foreign_key: :resource_owner_id,
           dependent: :delete_all

  has_many :access_tokens,
           class_name: 'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent: :delete_all

  class << self
    def authenticate(email, password)
      user = User.find_by_email(email)
      if user&.authenticate(password)
        user
      else
        raise Doorkeeper::Errors::UnableToGenerateToken
      end
    end

    def generate_refresh_token
      loop do
        token = SecureRandom.hex(32)
        break token unless Doorkeeper::AccessToken.exists?(refresh_token: token)
      end
    end
  end
end
