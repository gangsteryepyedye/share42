class AddLegalToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :legal, :boolean, :default=>false
  end
end
