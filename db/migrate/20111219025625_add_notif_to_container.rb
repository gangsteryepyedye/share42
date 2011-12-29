class AddNotifToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :notif, :boolean, :default=>true
  end
end
