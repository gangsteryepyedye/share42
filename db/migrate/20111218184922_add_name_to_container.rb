class AddNameToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :name, :string
  end
end
