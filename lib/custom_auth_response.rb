# frozen_string_literal: true

module CustomAuthResponse
  def body
    user = User.find(@token.resource_owner_id)
    additional_data = {
      id: @token.resource_owner_id,
      username: user.username,
      email: user.email
    }

    super.merge(additional_data)
  end
end
