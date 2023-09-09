class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'rooms_channel'
  end
end
