class TransactionsController < ApplicationController
	before_action :authenticate_user!
	def index
		@transactions = Transaction.all
	end

	def new
		@transaction = Transaction.new
	end

	def create
		
	end
end
