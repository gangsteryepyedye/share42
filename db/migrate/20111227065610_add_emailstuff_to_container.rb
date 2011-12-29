class AddEmailstuffToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :sender, :string
    add_column :containers, :subject, :string
    add_column :containers, :message, :text
  end
end
