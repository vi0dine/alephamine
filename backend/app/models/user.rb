# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                        :uuid             not null, primary key
#  account_type              :integer          default("bronze"), not null
#  email                     :string           not null
#  notifications_token       :string           not null
#  password_digest           :string           not null
#  permit_mail_notifications :boolean          default(TRUE), not null
#  permit_push_notifications :boolean          default(TRUE), not null
#  role                      :integer          default("user"), not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  has_secure_password

  enum role: %i[user admin]
  enum account_type: %i[bronze silver gold]

  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false }

  validates_presence_of :role, :account_type, :notifications_token

  has_many :watched_books, dependent: :destroy
  has_many :books, through: :watched_books

  has_many :access_grants,
           class_name: 'Doorkeeper::AccessGrant',
           foreign_key: :resource_owner_id,
           dependent: :delete_all

  has_many :access_tokens,
           class_name: 'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent: :delete_all

  after_initialize do |user|
    user.role ||= :user
    user.account_type ||= :bronze
  end

  scope :bronzes, -> { where(account_type: :bronze) }
  scope :silvers, -> { where(account_type: :silver) }
  scope :golds, -> { where(account_type: :gold) }

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
