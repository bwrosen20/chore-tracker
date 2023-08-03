class CreateChores < ActiveRecord::Migration[7.0]
  def change
    create_table :chores do |t|
      t.string :title
      t.text :description
      t.boolean :completed
      t.integer :point_value
      t.datetime :due_date
      t.integer :user_id
      t.integer :repeat_chore_id

      t.timestamps
    end
  end
end
