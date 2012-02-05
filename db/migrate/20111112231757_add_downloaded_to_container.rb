class AddDownloadedToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :downloaded, :integer, :default=>30
  end
end
