class AddFakeToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :fake, :boolean
  end
end
