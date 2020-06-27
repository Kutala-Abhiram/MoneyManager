class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
	has_many :transactions

	def generate_graphs(type)
		case type
		when "transaction_count"
			card, cash, account = get_type_of_transactions_count
		when "transaction_amount"
			card, cash, account = get_type_of_transactions_amount	
		else
			card = cash = account = 0
		end
		
		p = Gruff::Pie.new
		p.title = "Type of #{type.gsub("_", " ")}"
		p.data("Card", [card])
		p.data("Cash", [cash])
		p.data("Accounts", [account])
		p
	end

	def get_type_of_transactions_count
		card_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("card")).size
		cash_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("cash")).size
		account_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("accounts")).size
		return card_type_transactions, cash_type_transactions, account_type_transactions
	end

	def get_type_of_transactions_amount
		card_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("card")).pluck(:amount).sum
		cash_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("cash")).pluck(:amount).sum
		account_type_transactions = self.transactions.where(account: Transaction::ACCOUNT.key("accounts")).pluck(:amount).sum
		return card_type_transactions, cash_type_transactions, account_type_transactions
	end

	def self.authenticate(email, password)
     user = User.find_for_authentication(email: email)
     user.try(:valid_password?, password) ? user : nil
   end
end
