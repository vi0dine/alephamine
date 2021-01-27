# frozen_string_literal: true

class UserController < ApplicationController
  before_action :doorkeeper_authorize!, except: [:create]
  load_and_authorize_resource

  def create
    @auth = Doorkeeper::AccessToken.create(
      resource_owner_id: @user.id,
      refresh_token: User.generate_refresh_token,
      expires_in: Doorkeeper.configuration.access_token_expires_in.to_i,
      scopes: ''
    )
    if @user.save!
      render 'users/create', status: :created
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(%i[email password])
  end
end
