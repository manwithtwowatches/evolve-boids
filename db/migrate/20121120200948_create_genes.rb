class CreateGenes < ActiveRecord::Migration
  def change
    create_table :genes do |t|
      t.string :guid
      t.integer :status

      t.timestamps
    end
  end
end
