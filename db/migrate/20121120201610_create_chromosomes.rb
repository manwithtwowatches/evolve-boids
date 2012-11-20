class CreateChromosomes < ActiveRecord::Migration
  def change
    create_table :chromosomes do |t|
      t.string :d1
      t.string :d2
      t.float :proportion
      t.float :weight
      t.references :gene

      t.timestamps
    end
    add_index :chromosomes, :gene_id
  end
end
