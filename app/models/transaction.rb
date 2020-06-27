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

	def format_transaction_hash
		transaction_hash = {}
		transaction_hash[:id] = self.id
		transaction_hash[:amount] = self.amount
		transaction_hash[:account] = ACCOUNT[self.account]
		transaction_hash[:contents] = self.contents
		transaction_hash[:transaction_date] = self.transaction_date
		transaction_hash
	end

	def self.format_transactions_into_json_array(transactions)
		transactions_arr = []

		transactions.each do |transaction|
			transactions_arr << transaction.format_transaction_hash
		end

		transactions_arr
	end
end
