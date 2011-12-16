class AddEmptyToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :empty, :boolean, :default=>true
  end
end
