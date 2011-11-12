class AddCapacityToUser < ActiveRecord::Migration
  def change
    add_column :users, :capacity, :integer
  end
end
