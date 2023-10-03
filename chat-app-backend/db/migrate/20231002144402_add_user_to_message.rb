class AddUserToMessage < ActiveRecord::Migration[6.1]
  def change
    change_table :messages, bulk: true do |t|
      t.references :user, type: :uuid, foreign_key: true
    end

    remove_column :messages, :username
  end
end
