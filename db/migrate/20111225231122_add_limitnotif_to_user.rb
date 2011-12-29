class AddLimitnotifToUser < ActiveRecord::Migration
  def change
    add_column :users, :limitnotif, :boolean, :default=>true
  end
end
