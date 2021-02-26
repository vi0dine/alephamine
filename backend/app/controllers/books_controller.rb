# frozen_string_literal: true

class BooksController < ApplicationController
  before_action :doorkeeper_authorize!

  def index
    @books = if params[:scope] == 'dismissed'
               Book.includes(:watched_books)
                   .where(watched_books: { user: current_user })
                   .where.not(watched_books: { dismissed_at: nil })
                   .all
             else
               Book.includes(:watched_books)
                   .where(watched_books: { user: current_user })
                   .where(watched_books: { dismissed_at: nil })
                   .all
             end

    if @books
      render 'books/index', status: :ok
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def autocomplete
    @books = Book.search_book(params[:q]).to_a.uniq(&:title)&.pluck(:title)

    if @books
      render 'books/autocomplete', status: :ok
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

  def dismiss
    @book = Book.find(params[:id])
    if @book
      @watched_book = WatchedBook.find_by(user: current_user, book: @book)
      authorize! :manage, @watched_book
      @watched_book.update(dismissed_at: DateTime.now)
      render 'books/update', status: :ok
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def restore
    @book = Book.find(params[:id])
    if @book
      @watched_book = WatchedBook.find_by(user: current_user, book: @book)
      authorize! :manage, @watched_book
      @watched_book.update(dismissed_at: nil)
      render 'books/update', status: :ok
    else
      render json: { error: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.require(:book).permit([:title, :q])
  end
end
