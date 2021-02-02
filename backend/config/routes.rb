# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    use_doorkeeper
    resources :users, only: %i[show create update]
    resources :books, only: %i[index create]
    patch '/books/:id/dismiss', to: 'books#dismiss'
    patch '/books/:id/restore', to: 'books#restore'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
