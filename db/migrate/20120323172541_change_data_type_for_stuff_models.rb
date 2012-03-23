class ChangeDataTypeForStuffModels < ActiveRecord::Migration
 def up
  	change_table :stuffs do |t|
      t.change :file_file_size, :bigint
    end
  end

  def down
  	change_table :stuffs do |t|
      t.change :file_file_size, :integer
    end
  end 
end
