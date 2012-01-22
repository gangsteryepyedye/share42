class AddZippedToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :zipped, :boolean, :default=>false
  end
end
