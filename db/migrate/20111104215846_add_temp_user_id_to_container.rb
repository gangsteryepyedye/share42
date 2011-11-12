class AddTempUserIdToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :tempuser_id, :integer
  end
end
