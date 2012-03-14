class ApplicationController < ActionController::Base
  protect_from_forgery
  force_ssl
  
 
  helper_method :current_user, :current_temp



def current_user
  @current_user ||= User.find_by_auth_token!(cookies[:auth_token]) if cookies[:auth_token]
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
