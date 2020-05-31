class UsersController < ApplicationController
	before_action :authenticate_user!

	def index
		
	end

	def generate_graph
		send_data(current_user.generate_graphs(params[:graph_type]).to_blob, 
    :disposition => 'inline', 
    :type => 'image/png')
	end

	def settings
	end

	def support
		@email = "kabhiram1998@gmail.com"
		@mobile = "+919944581756"
	end
end
