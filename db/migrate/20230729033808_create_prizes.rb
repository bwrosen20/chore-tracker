class CreatePrizes < ActiveRecord::Migration[7.0]
  def change
    create_table :prizes do |t|
      t.string :title
      t.text :description
      t.integer :point_value
      t.boolean :awarded
      t.integer :user_id
      t.integer :repeat_prize_id

      t.timestamps
    end
  end
end

#100 claims means infinite
