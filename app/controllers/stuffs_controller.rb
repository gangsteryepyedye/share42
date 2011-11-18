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
    @container=Container.find(params[:container_id])
    @container.empty=false
    

    if (@container.emails.empty?)
      



      if !(params[:email]=="")
        emails=params[:email].to_s.split(/,/)
        
          for email in emails
          #get sender's name
          sender=params[:sender]
          #get subject if there is any
          subject=params[:subject]
          #get message if there is any
          message=params[:message]
          #send the email
          Notifier.notify(sender,message,sender,email,@stuff.file_file_name).deliver

          #add the email to collection
          a=@container.emails.new(:name=>email)
          a.save
          end
      end
      #set number of downloads to 0
      @container.downloaded=0
      
      #get the password
      @container.password=params[:container_password]
        




    end
   



   @container.save






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
