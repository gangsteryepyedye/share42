class AddPasswordToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :password, :string
  end
end
