class UsersController < ApplicationController
	before_action :authenticate_user!

	def index
		
	end

	def settings
	end

	def support
		@email = "kabhiram1998@gmail.com"
		@mobile = "+919944581756"
	end
end
