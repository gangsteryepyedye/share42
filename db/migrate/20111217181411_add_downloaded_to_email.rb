class AddDownloadedToEmail < ActiveRecord::Migration
  def change
    add_column :emails, :downloaded, :integer, :default=>0
  end
end
