Rails.application.routes.draw do
  post '/createAccount', to: 'users#createAccount'
  post '/signup', to: 'users#signup'
  resources :repeat_prizes
  resources :repeat_chores
  resources :checks
  resources :chores
  resources :prizes
  resources :admins
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
