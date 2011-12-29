class AddEverytimeToUser < ActiveRecord::Migration
  def change
    add_column :users, :everytime, :boolean, :default=>false
  end
end
