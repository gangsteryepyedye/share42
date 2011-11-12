class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :passowrd_hash
      t.string :password_salt
      t.string :priviledge
      t.integer :storage

      t.timestamps
    end
  end
end
