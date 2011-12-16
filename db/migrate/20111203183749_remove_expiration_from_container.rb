class RemoveExpirationFromContainer < ActiveRecord::Migration
  def up
    remove_column :containers, :expiration
  end

  def down
    add_column :containers, :expiration, :integer
  end
end
