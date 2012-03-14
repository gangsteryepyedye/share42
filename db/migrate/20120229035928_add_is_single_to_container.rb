class AddIsSingleToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :is_single, :boolean
  end
end
