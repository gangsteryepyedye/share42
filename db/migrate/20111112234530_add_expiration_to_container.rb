class AddExpirationToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :expiration, :integer
  end
end
