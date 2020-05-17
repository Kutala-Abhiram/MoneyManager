class TransactionsController < ApplicationController
	before_action :authenticate_user!
	def index
		@transactions = current_user.transactions
	end

	def new
		@transaction = Transaction.new
	end

	def create
		transaction_data = transaction_params.merge!({transaction_date: Time.zone.now})
		@transaction = Transaction.new(transaction_data)
		byebug
		@transaction.account = Transaction::ACCOUNT.key(params[:transaction][:account])
		@transaction.user_id = current_user.id
		@transaction.save
		redirect_to user_transactions_path(current_user)
	end

	private

	def transaction_params
		params.require(:transaction).permit(:amount, :contents)
	end
end
