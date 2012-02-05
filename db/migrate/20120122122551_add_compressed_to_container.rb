class AddCompressedToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :compressed, :boolean
  end
end
