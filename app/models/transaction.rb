class Transaction < ApplicationRecord
	belongs_to :user

	ACCOUNT = {1 => "cash", 2 => "accounts", 3 => "card"}

	def self.create_transaction(params, transaction_params, user_id)
		transaction = Transaction.new(transaction_params)
		transaction.account = ACCOUNT.key(params[:transaction][:account])
		transaction.user_id = user_id
		if transaction.save
			return {"success" => true, "message" => "Transaction created successfully"}
		else
			return {"success" => false, "message" => transaction.errors.full_messages}
		end
	end

	def update_transaction(params, transaction_params)
		if self.update(transaction_params.merge!(account: Transaction::ACCOUNT.key(params[:transaction][:account])))
			return {"success" => true, "message" => "Transaction updated successfully"}
		else
			return {"success" => false, "message" => transaction.errors.full_messages}
		end
	end
end
