class ApplicationController < ActionController::Base
  protect_from_forgery
  force_ssl
  
 
  helper_method :current_user, :current_temp



def current_user
  @current_user ||= User.find(session[:user_id]) if session[:user_id]
end
  

#assuming container controller always takes action faster than user_info method
def current_temp
  @remote_ip = request.remote_ip.to_s
  @current_temp = Tempuser.where("ip =?",@remote_ip).first
end
  
  
  
  
  
  
  
end
