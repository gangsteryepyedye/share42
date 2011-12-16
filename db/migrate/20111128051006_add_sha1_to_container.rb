class AddSha1ToContainer < ActiveRecord::Migration
  def change
    add_column :containers, :sha1, :string
  end
end
