class RoomsController < ApplicationController
  def index
    rooms = Room.all

    render json: rooms
  end

  def create
    room = Room.create!(location: params[:location])

    render json: room

    ActionCable.server.broadcast('rooms_channel', 'success')
  end
end
