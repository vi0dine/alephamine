class PushNotifierJob < ApplicationJob
  queue_as :push_notifiers

  def perform(users, book)
    ExpoNotificationsService.new(users, book).call
  end
end