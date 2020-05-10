class AddTransactionData < ActiveRecord::Migration[6.0]
  def change
  	add_column :transactions, :amount, :integer, :default => 0
  	add_column :transactions, :account, :integer
  	add_column :transactions, :contents, :string
  	add_column :transactions, :transaction_date, :datetime
  end
end
