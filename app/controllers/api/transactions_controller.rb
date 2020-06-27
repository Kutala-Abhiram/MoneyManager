class Api::TransactionsController < Api::BaseController
  before_action :doorkeeper_authorize!
  before_action :check_transaction_authorization, only: [:show, :update]

  def index
  	transaction_arr = Transaction.format_transactions_into_json_array(current_resource_owner.transactions)
  	render json: {"success" => true, "transactions" => transaction_arr}
  end

  def show
  	transaction_hash = @transaction.format_transaction_hash
  	render json: {"success" => true, "transaction" => transaction_hash}
  end

  def create
		transaction_data = transaction_params.merge!({transaction_date: Time.zone.now})
		response = Transaction.create_transaction(params, transaction_data, current_resource_owner.id)
		render json: response
  end

  def update
  	response = @transaction.update_transaction(params, transaction_params)
  	render json: response
  end

  private

  def check_transaction_authorization
  	@transaction = Transaction.find_by(id: params[:id])
  	unless @transaction.user_id == doorkeeper_token.resource_owner_id
  		head :forbidden
  	end
  end

  def transaction_params
		params.require(:transaction).permit(:amount, :contents)
	end
end