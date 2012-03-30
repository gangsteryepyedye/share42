class JsonController < ApplicationController

  respond_to :json






  def before_download_check
    @container=Container.find_by_id_or_sha1(params[:id])

    

    if @container.user_id.nil?
      @downloadcap=30
    else
      @user = User.find(@container.user_id)
      @downloadcap=@user.downloadcap
    end

    if @container.downloaded+1 > @downloadcap
        

       @tiny_id = "http://www.42share.com/containers/"+@container.sha1
       @link=Container.shorten(@tiny_id).short_url 

       if (!@user.nil?)
        if @user.limitnotif==true
            Notifier.limit_notify(@user.email,@link).deliver
        end
       else
          Notifier.limit_notify(@container.sender,@link).deliver
       end

       respond_with({
          :status => "You have reached the download limit for this folder."
        })           

    elsif @container.zipped==false
      respond_with({
          :status => "We are still busy zipping up files for this folder, please come back later or download individual files."
      })
    else
      respond_with({
         :status => "pass"
      })  
    end
  end


  def password_match
    
    @container=Container.find_by_id_or_sha1(params[:id])

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

      space_left = current_user.capacity - current_user.storage

      if current_user.spf > space_left
        availablespace = space_left
      else
        availablespace = current_user.spf
      end


      respond_with({
        :availablespace => availablespace
      })



    else
      respond_with({
        :availablespace => 2147483648
      })
    end
  end

  
  def user_info
    if(current_user)
        @user=current_user        
        respond_with({
            :maxfilenumber => 500,
            :maxfilesize => @user.spf
          })          
    else 
        respond_with({
            :maxfilenumber => 500,
            :maxfilesize => 2147483648
        })          
    end
       
  end  
  
  
    

end
