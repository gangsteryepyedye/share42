class AddExpiresToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :expires, :integer
  end
end
