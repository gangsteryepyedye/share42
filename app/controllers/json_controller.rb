class JsonController < ApplicationController

  respond_to :json
  

  def storage
    @remote_ip = request.remote_ip.to_s
    if(current_user)
      respond_with({
        :availablespace => current_user.capacity - current_user.storage
      })
    else
      temp_user=Tempuser.where("ip =?",@remote_ip).first
      respond_with({
        :availablespace => temp_user.capacity - temp_user.storage
      })
    end
  end

  
  def user_info
    if(current_user)
        @user=current_user        
        respond_with({
            :maxfilenumber => 50,
            :maxfilesize => @user.spf
          })          
    else 
        @user=current_temp
        respond_with({
            :maxfilenumber => 50,
            :maxfilesize => @user.spf
        })          
    end
       
  end  
  
  
    

end
