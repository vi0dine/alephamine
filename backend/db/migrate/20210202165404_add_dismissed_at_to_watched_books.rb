class AddDismissedAtToWatchedBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :watched_books, :dismissed_at, :datetime
  end
end
