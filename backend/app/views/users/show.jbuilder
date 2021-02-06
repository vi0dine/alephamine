# frozen_string_literal: true

json.user do
  json.id @user.id
  json.email @user.email
  json.role @user.role
  json.account_type @user.account_type
  json.permit_push_notifications @user.permit_push_notifications
  json.permit_mail_notifications @user.permit_mail_notifications
end
