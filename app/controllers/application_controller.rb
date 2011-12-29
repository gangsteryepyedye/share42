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
 
def url_escape(string)
string.gsub(/([^ a-zA-Z0-9_.-]+)/n) do
'%' + $1.unpack('H2' * $1.size).join('%').upcase
end.tr(' ', '+')
end

def url_unescape(string)
string.tr('+', ' ').gsub(/((?:%[0-9a-fA-F]{2})+)/n) do
[$1.delete('%')].pack('H*')
end
end
  
  
  
  
  
  
end
