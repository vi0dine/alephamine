class AddNotificationsConfigurationToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :permit_push_notifications, :boolean, null: false, default: true
    add_column :users, :permit_mail_notifications, :boolean, null: false, default: true
  end
end
