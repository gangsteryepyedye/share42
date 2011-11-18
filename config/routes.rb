Filetunnel::Application.routes.draw do
 
  get "pages/pricing"

  get "pages/about"

  get "sessions/new"

  get "users/new"

  resources :stuffs
  resources :containers

  resources :json
  get "priviledge" => "json#user_info"


  get "log_out" => "sessions#destroy", :as => "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"
  root :to => "containers#new"
  
  
  resources :users
  resources :sessions
  
  
  
  
  match ':controller(/:action(/:id(.:format)))'

  

  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
