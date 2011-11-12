class StuffsController < ApplicationController
  
  


  
  def destroy
     @stuff=Stuff.find(params[:id])
     @stuff.destroy
     render :json => true    
  end
  

  
  def new
    @stuff = Stuff.new
  end
   
  def create
    @remote_ip = request.remote_ip.to_s

    @stuff = Stuff.new(params[:stuff])
    @stuff.container_id = params[:container_id]        


    if current_user
      storage=current_user.storage
    else
      storage=Tempuser.where("ip =?",@remote_ip).first.storage
    end


    if(!@stuff.validate_storage_left(params[:stuff],storage))
       render :json => { :result => 'error'}, :content_type => 'text/html'
    else    
      if @stuff.save
        reduce_storage(params[:stuff][:file].size)
        render :json =>  [@stuff.to_jq_upload.to_json]
      else
        render :json => { :result => 'error'}, :content_type => 'text/html'
      end
    end
  end

  def index
   
  end

  def show
    
  end




  def reduce_storage(amount)  
    @remote_ip = request.remote_ip.to_s

    if(current_user)
      current_user.storage = current_user.storage-amount
      current_user.save
    else
      temp_user=Tempuser.where("ip =?",@remote_ip).first
      temp_user.storage = temp_user.storage-amount
      temp_user.save
    end
      
  end

end
