class RemoveExpiresFromContainer < ActiveRecord::Migration
  def up
    remove_column :containers, :expires
  end

  def down
    add_column :containers, :expires, :integer
  end
end
