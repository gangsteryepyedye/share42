class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.integer :container_id

      t.timestamps
    end
  end
end
