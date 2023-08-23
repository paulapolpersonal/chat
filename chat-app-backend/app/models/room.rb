class Room < ApplicationRecord
  has_many :messages

  after_create :add_name

  def add_name
    update!(name: "Chatroom #{id}")
  end
end
