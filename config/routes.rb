Rails.application.routes.draw do
  post '/createAccount', to: 'users#createAccount'
  post '/signup', to: 'users#signup'
  get '/me', to: 'users#show'
  get '/users/:group', to: 'users#index'
  patch '/users/:id', to: 'users#update'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  resources :repeat_prizes
  resources :repeat_chores
  resources :checks
  resources :chores
  resources :prizes
  resources :admins
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
