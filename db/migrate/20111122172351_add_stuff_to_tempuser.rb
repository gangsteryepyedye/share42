class AddStuffToTempuser < ActiveRecord::Migration
  def change
    add_column :tempusers, :capacity, :integer
    add_column :tempusers, :priviledge, :integer
    add_column :tempusers, :spf, :integer
    add_column :tempusers, :downloadcap, :integer
  end
end
