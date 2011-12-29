class AddNotifToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :notif, :boolean, :default=>true
  end
end
