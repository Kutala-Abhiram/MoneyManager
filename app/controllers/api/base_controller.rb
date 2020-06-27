class Api::BaseController < ActionController::API
  respond_to :json

  def current_resource_owner
  	User.find_by(id: doorkeeper_token.resource_owner_id)
  end
end