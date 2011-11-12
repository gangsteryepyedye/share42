class AddFileColumnsToStuff < ActiveRecord::Migration
  def self.up
    add_column :stuffs, :file_file_name,    :string
    add_column :stuffs, :file_content_type, :string
    add_column :stuffs, :file_file_size,    :integer
    add_column :stuffs, :file_updated_at,   :datetime
  end

  def self.down
    remove_column :stuffs, :file_file_name
    remove_column :stuffs, :file_content_type
    remove_column :stuffs, :file_file_size
    remove_column :stuffs, :file_updated_at
  end
end
