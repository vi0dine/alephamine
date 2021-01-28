# frozen_string_literal: true

module CustomAuthResponse
  def body
    user = User.find(@token.resource_owner_id)
    additional_data = {
      id: @token.resource_owner_id,
      email: user.email,
      role: user.role,
      account_type: user.account_type
    }

    super.merge(additional_data)
  end
end
