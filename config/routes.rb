Rails.application.routes.draw do
  root "users#show"
  post '/createAccount', to: 'users#createAccount'
  post '/signup', to: 'users#signup'
  get '/me', to: 'users#show'
  get '/users', to: 'users#index'
  patch '/users/:id', to: 'users#update'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  patch '/chores/claim', to:'chores#claim'
  patch '/chores/finished', to:'chores#finished'
  patch '/award/:id', to:'prizes#award'
  resources :repeat_prizes
  resources :repeat_chores
  resources :checks
  resources :chores
  resources :prizes
  resources :admins
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  
end
