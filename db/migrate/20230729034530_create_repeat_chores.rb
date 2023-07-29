class CreateRepeatChores < ActiveRecord::Migration[7.0]
  def change
    create_table :repeat_chores do |t|
      t.string :title
      t.text :description
      t.integer :point_value
      t.string :repeat_every

      t.timestamps
    end
  end
end
