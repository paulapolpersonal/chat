class RoomsController < ApplicationController
  def index
    rooms = Room.all

    render json: rooms
  end

  def create
    Room.create!(location: params[:location])

    render json: Room.all
  end
end
