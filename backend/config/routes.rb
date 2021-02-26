# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    use_doorkeeper
    resources :users, only: %i[show create update]
    resources :books, only: %i[index create]
    get '/books/autocomplete', to: 'books#autocomplete'
    patch '/books/:id/dismiss', to: 'books#dismiss'
    patch '/books/:id/restore', to: 'books#restore'
  end
end
