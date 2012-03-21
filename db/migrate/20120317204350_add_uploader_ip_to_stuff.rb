class AddUploaderIpToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :uploader_ip, :string
  end
end
