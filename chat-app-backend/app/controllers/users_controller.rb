class UsersController < ApplicationController
  def show
    user = User.find_by(browser: params[:browser])

    render json: user
  end

  def create
    user = User.create!(browser: params[:browser], name: params[:name])

    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update!(name: params[:name])

    render json: user
  end
end
