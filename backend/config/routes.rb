# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    use_doorkeeper
    resources :users, only: :create
    resources :books, only: %i[index create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
