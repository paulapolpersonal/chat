class ChatChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.

  def subscribed
    stream_from "chat_#{params[:room_id]}"
  end

  def receive(data)
    new_message = data['message']
    username = data['username']

    message = Message.new
    message.message = new_message
    message.username = username
    message.room_id = params[:room_id]
    message.save

    ActionCable.server.broadcast("chat_#{params[:room_id]}", data['message'])
  end
end
