class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def receive(data)
    Message.create!(message: data['message'], username: data['username'], room_id: params[:room_id])

    ActionCable.server.broadcast("chat_#{params[:room_id]}", data)
  end
end
