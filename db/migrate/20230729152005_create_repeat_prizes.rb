class CreateRepeatPrizes < ActiveRecord::Migration[7.0]
  def change
    create_table :repeat_prizes do |t|
      t.string :title
      t.text :description
      t.integer :point_value
      t.integer :how_many_claims
      t.timestamps
    end
  end
end
