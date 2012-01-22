class AddTotalsizeToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :total_size, :integer, :default=>0
  end
end
