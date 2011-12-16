class AddDownloadedToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :downloaded, :integer, :default=>0
  end
end
