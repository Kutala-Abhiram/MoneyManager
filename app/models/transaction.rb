class Transaction < ApplicationRecord
	belongs_to :user

	ACCOUNT = {1 => "cash", 2 => "accounts", 3 => "card"}
end
