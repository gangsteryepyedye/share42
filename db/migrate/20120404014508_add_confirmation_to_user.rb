class AddConfirmationToUser < ActiveRecord::Migration
  def change
    add_column :users, :confirmation_code, :string
    add_column :users, :confirmed, :boolean
    add_column :users, :confirmation_sent_at, :datetime
  end
end
