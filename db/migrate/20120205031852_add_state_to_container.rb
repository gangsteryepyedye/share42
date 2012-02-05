class AddStateToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :state, :string
  end
end
