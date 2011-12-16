class AddListToUser < ActiveRecord::Migration
  def change
    add_column :users, :list, :text
  end
end
