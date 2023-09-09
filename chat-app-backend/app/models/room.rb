class Room < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :location, presence: true

  after_create :add_name

  def add_name
    update!(name: "Chatroom #{id}")
  end
end
