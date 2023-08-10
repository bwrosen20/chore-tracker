class CreateChecks < ActiveRecord::Migration[7.0]
  def change
    create_table :checks do |t|
      t.string :comment
      t.string :approved
      t.integer :chore_id

      t.timestamps
    end
  end
end
