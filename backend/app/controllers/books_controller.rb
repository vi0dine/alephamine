# frozen_string_literal: true

class BooksController < ApplicationController
  before_action :doorkeeper_authorize!

  def index
    @books = Book.includes(:watched_books).where(watched_books: { user: current_user }).all

    if @books
      render 'books/index', status: :ok
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def create
    authorize! :create, Book
    @book = Book.find_or_create_by!(title: book_params[:title])
    if @book
      BookWatcherJob.perform_later(@book)
      WatchedBook.find_or_create_by!(user: current_user, book: @book)
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
