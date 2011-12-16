class AddExptimeToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :exptime, :datetime
  end
end
