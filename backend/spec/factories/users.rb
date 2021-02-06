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
FactoryBot.define do
  factory :user do
    sequence(:email) { |n| Faker::Internet.email << n.to_s }
    account_type { User.account_types.keys.sample }
    role { User.roles.keys.sample }
    password_digest { Faker::Internet.password }
    notifications_token { Faker::Lorem.characters(number: 32) }
  end
end
