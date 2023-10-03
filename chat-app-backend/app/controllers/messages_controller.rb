class MessagesController < ApplicationController
  def index
    messages = Message.includes(:user).where(room_id: params[:room_id])

    render json: messages.as_json(include: { user: { only: %i[browser name] } })
  end
end
