class AddFakeLinkToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :fake_link, :string
  end
end
