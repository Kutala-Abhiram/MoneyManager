class TransactionsController < ApplicationController
	before_action :authenticate_user!
	def index
		@transactions = current_user.transactions
	end

	def new
		@transaction = Transaction.new
	end

	def edit
		@transaction = Transaction.find_by(id: params[:id])
		@edit_form = true
	end

	def create
		transaction_data = transaction_params.merge!({transaction_date: Time.zone.now})
		Transaction.create_transaction(params, transaction_data, current_user.id)
		redirect_to user_transactions_path(current_user)
	end

	def update
		@transaction = Transaction.find_by(id: params[:id])
		@transaction.update_transaction(params, transaction_params)
		redirect_to user_transactions_path(current_user)
	end

	private

	def transaction_params
		params.require(:transaction).permit(:amount, :contents)
	end
end
