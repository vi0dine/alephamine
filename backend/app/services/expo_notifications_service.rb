class ExpoNotificationsService

  def initialize(users, book)
    @client = Exponent::Push::Client.new(gzip: true)
    @users = users
    @book = book
  end

  def call
    @client.send_messages(build_messages)
  end

  private

  def build_messages
    @users.map do |user|
      message(user, @book)
    end
  end

  def message(user, book)
    {
      to: user.notifications_token,
      sound: 'default',
      priority: user.bronze? ? 'normal' : 'high',
      title: book.title,
      body: "Książka jest już dostępna! Przejdź na stronę i zamów egzemplarz!"
    }
  end
end