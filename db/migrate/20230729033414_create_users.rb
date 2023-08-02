class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.boolean :admin
      t.integer :points
      t.string :group_name

      t.timestamps
    end
  end
end
