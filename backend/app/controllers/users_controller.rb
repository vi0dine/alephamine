# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :doorkeeper_authorize!, except: [:create]
  load_and_authorize_resource except: :create

  def create
    @user = User.new(user_params)
    if @user.save!
      @auth = Doorkeeper::AccessToken.create(
        resource_owner_id: @user.id,
        refresh_token: User.generate_refresh_token,
        expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
        scopes: ''
      )
      render 'users/create', status: :created
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user ||= current_user
    render 'users/show', status: :ok
  end

  def update
    render 'users/update', status: :ok if @user.update(user_params)
  end

  private

  def user_params
    params.require(:user).permit(%i[email password notifications_token permit_push_notifications
                                    permit_mail_notifications])
  end
end
