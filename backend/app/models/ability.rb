# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    if user.admin?
      can :manage, :all
    elsif user.user?
      can :read, LibBook
      can :create, Book
      can :manage, WatchedBook, user_id: user.id
    else
      can :create, User
    end
  end
end
