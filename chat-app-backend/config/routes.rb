Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :rooms, only: %w[index create]
  resources :messages, only: :index

  mount ActionCable.server => '/cable'
end
