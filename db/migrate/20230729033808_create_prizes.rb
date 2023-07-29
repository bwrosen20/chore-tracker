class CreatePrizes < ActiveRecord::Migration[7.0]
  def change
    create_table :prizes do |t|
      t.string :title
      t.text :description
      t.integer :point_value
      t.integer :user_id

      t.timestamps
    end
  end
end
