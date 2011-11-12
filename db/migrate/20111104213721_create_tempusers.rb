class CreateTempusers < ActiveRecord::Migration
  def change
    create_table :tempusers do |t|
      t.string :ip
      t.integer :storage

      t.timestamps
    end
  end
end
