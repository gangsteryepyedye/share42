Filetunnel::Application.routes.draw do
 

 
  mount Resque::Server, :at => "/resque"  

  resources :s3_uploads

  get "pages/pricing"
  get "pages/account"
  get "pages/about"
  get "pages/test"
  get "pages/undefined"
  get "pages/tos"
  get "pages/privacy"
  get "pages/contact_us"
  get "pages/vendors"
  get "pages/tour"

  get "sessions/new"

  get "users/new"

  resources :stuffs do
    member do
     get 'download'
   end
  end
  resources :containers do
    member do
      get 'download_all'
      get 'remove'
      get 'remove_folder'
    end
  end


  get "show_newtransfer" => "containers#show_newtransfer"
  get "partial_update" => "containers#partial_update"
  get "show_container" => "containers#show_container"  
  get "new_transfer" => "containers#new_transfer"
  get "send_notification" => "containers#send_notification"
  

  resources :json
  get "priviledge" => "json#user_info"
  get "storage" => "json#storage"
  get "password_match" => "json#password_match"
  get "compression_check" => "json#before_download_check"

  get "test" => "containers#test"

  get "log_out" => "sessions#destroy", :as => "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"
  get "sign_up_free" => "users#new_free", :as=>"sign_up_free"
  root :to => "containers#new"
  
  
  resources :users do
    member do 
       put 'update_password'
       put 'update_email'
       put 'update_notifications'
       put 'upgrade'
    end
  end

  resources :sessions
  
  

  

  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'

end
