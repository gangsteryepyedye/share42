class AddSha1ToStuff < ActiveRecord::Migration
  def change
    add_column :stuffs, :sha1, :string
  end
end
