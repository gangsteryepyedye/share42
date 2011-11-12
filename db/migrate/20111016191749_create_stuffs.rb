class CreateStuffs < ActiveRecord::Migration
  def change
    create_table :stuffs do |t|
      t.string :name
      t.integer :container_id

      t.timestamps
    end
  end
end
