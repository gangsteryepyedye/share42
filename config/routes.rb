Filetunnel::Application.routes.draw do
 

 
 
  get "pages/pricing"

  get "pages/about"

  get "sessions/new"

  get "users/new"

  resources :stuffs do
    member do
     get 'download'
   end
  end
  resources :containers
  get "partial_update" => "containers#partial_update"  
  get "new_transfer" => "containers#new_transfer"
 

  resources :json
  get "priviledge" => "json#user_info"
  get "storage" => "json#storage"



  get "log_out" => "sessions#destroy", :as => "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"
  get "sign_up_free" => "users#new_free", :as=>"sign_up_free"
  root :to => "containers#new"
  
  
  resources :users
  resources :sessions
  
  
  

  

  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'

end
