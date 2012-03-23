class ChangeDataTypeForMultipleModels < ActiveRecord::Migration
  def up
  	change_table :users do |t|
      t.change :capacity, :bigint
      t.change :spf, :bigint
      t.change :storage, :bigint
    end
  end

  def down
  	change_table :users do |t|
      t.change :capacity, :integer
      t.change :spf, :integer
      t.change :storage, :integer            
    end
  end
end
