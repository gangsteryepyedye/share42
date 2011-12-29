class AddDownloadsToEmail < ActiveRecord::Migration
  def change
    add_column :emails, :downloads, :integer, :default=>0
  end
end
