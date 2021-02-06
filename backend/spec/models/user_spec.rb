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
require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }
  it { should validate_presence_of(:role) }
  it { should validate_presence_of(:account_type) }
  it { should validate_presence_of(:notifications_token) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }

  it { should define_enum_for(:role).with_values([:user, :admin]) }
  it { should define_enum_for(:account_type).with_values([:bronze, :silver, :gold]) }

  it { should have_many(:watched_books) }
  it { should have_many(:books).through(:watched_books) }
end
