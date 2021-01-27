# frozen_string_literal: true

class BooksController < ApplicationController
  before_action :doorkeeper_authorize!

  def create
    authorize! Book, :create
    @book = Book.find_or_create_by!(title: book_params[:title])
    if @book
      WatchedBook.create!(book: @book, user: current_user)
      render 'books/create', status: :created
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit([:title])
  end
end
