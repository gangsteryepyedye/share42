class JsonController < ApplicationController

  respond_to :json


  def password_match
    
    @container=Container.find_by_id_or_sha1(params[:id].to_i)

    if (!@container.nil?)
      if(params[:password]==@container.password)
        respond_with({
          :match => "true"
        })  
      else
        respond_with({
          :match => "false"
        })
      end
    else
      respond_with({
          :match => "false"
      })  
    end  

  end


  def storage
    if(current_user)
      respond_with({
        :availablespace => current_user.capacity - current_user.storage
      })
    else
      respond_with({
        :availablespace => 157286400
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
        respond_with({
            :maxfilenumber => 50,
            :maxfilesize => 157286400
        })          
    end
       
  end  
  
  
    

end
