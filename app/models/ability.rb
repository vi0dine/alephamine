# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    if user.admin?
      can :manage, :all
    else
      can :read, LibBook
      can :read, Book
      can :create, Book
      can :manage, WatchedBook, user_id: user.id
    end
  end
end
