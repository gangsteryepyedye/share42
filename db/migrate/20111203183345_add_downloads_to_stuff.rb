class AddDownloadsToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :downloads, :integer
  end
end
