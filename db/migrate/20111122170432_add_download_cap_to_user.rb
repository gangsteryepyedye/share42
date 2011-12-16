class AddDownloadCapToUser < ActiveRecord::Migration
  def change
    add_column :users, :downloadcap, :integer
  end
end
