class CreateRedEnvelopes < ActiveRecord::Migration
  def change
    create_table :red_envelopes do |t|
      t.float :amount
      t.integer :user_id

      t.timestamps
    end
  end
end
