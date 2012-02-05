class AddDownloadcapToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :downloadcap, :integer
  end
end
