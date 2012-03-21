class CreateSpacecops < ActiveRecord::Migration
  def change
    create_table :spacecops do |t|

      t.timestamps
    end
  end
end
