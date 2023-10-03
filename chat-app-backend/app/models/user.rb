class User < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :browser, uniqueness: true
end
