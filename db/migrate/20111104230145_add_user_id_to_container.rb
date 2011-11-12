class AddUserIdToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :user_id, :integer
  end
end
