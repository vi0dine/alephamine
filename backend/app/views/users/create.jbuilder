# frozen_string_literal: true

json.user do
  json.id @user.id
  json.email @user.email
  json.role @user.role
  json.account_type @user.account_type
  json.access_token @auth.token
  json.refresh_token @auth.refresh_token
end
