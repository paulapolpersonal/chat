class Message < ApplicationRecord
  belongs_to :room

  validates :username, presence: true
end
