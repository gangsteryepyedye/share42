class AddMaximumSizePerFileToUser < ActiveRecord::Migration
  def change
    add_column :users, :spf, :integer
  end
end
