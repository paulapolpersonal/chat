class AddRoomToMessage < ActiveRecord::Migration[6.1]
  def up
    change_table :messages, bulk: true do |t|
      t.references :rooms, foreign_key: true
    end
  end
end
