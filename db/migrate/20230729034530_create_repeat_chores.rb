class CreateRepeatChores < ActiveRecord::Migration[7.0]
  def change
    create_table :repeat_chores do |t|
      t.string :title
      t.text :description
      t.integer :point_value
      t.text :repeat_every, array: true, default: []
      t.string :participants, array:true, default:[]
      t.boolean :cycle_between
      t.timestamps
    end
  end
end
