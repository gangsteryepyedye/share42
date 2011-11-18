class JsonController < ApplicationController

  respond_to :json
  





  def storage
    @remote_ip = request.remote_ip.to_s

    if(current_user)
      respond_with({
        :storage => current_user.storage
      })
    else
      temp_user=Tempuser.where("ip =?",@remote_ip).first
      respond_with({
        :storage => temp_user.storage       
      })
    end
  end

  
  def user_info
    if(current_user)
        @user=current_user
        if(@user.priviledge=="premium")
            respond_with({
              :maxfilenumber => 200,
              :maxfilesize => 500000000
            })          
        else
          respond_with({
              :maxfilenumber => 100,
              :maxfilesize => 200000000
            })   
        end   
    else
      respond_with({
              :maxfilenumber => 100,
              :maxfilesize => 200000000
      })  
    end 
       
  end  
  
  
    

end
