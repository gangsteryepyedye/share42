class StuffsController < ApplicationController
  
 # def download
   # @stuff=Stuff.find(params[:id])
   # url=@stuff.file

  #  redirect_to(url.expiring_url(15),:type=>@stuff.file_content_type)
 # end
def download
   
    require 'aws/s3'

    @stuff=Stuff.find_by_id_or_sha1(params[:id])   


    @container=Container.find(@stuff.container_id)
    

    @container.downloaded=@container.downloaded+1
    @container.save
  
  
    if (!params[:email].nil?) 
         query=url_unescape(params[:email])

        @email=@container.emails.where("name =?",query).first
          if(!@email.nil?)
              @email.downloads=@email.downloads+1
              @email.save
              @tiny_id = "http://127.0.0.1:3000/containers/"+@container.sha1
              @link=Container.shorten(@tiny_id).short_url
              if @container.user_id.nil?
                 Notifier.download_notify(@email.name,@container.sender,@link).deliver
              else
                @user=User.find(@container.user_id)
                if (@user.everytime==true||(@user.everytime==false&&@email.downloads==1))                  
                  Notifier.download_notify(@email.name,@user.email,@link).deliver
                end
              end
            end
    end        

    AWS::S3::Base.establish_connection!(
    :access_key_id => "AKIAICDXU5SXRWQA5RQA",
    :secret_access_key => "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"
    )
    filename=@stuff.file.path[1..-1]

    s3obj = AWS::S3::S3Object.find(filename, 'filetunnel')
    file_type = s3obj.about["content-type"]
    file_length = s3obj.about["content-length"]


    send_file_headers!(:length => file_length, :type => file_type, :filename => @stuff.file_file_name)
    render :status => 200, :text => Proc.new { |response, output|
    AWS::S3::S3Object.stream(filename, 'filetunnel') do |chunk|
    output.write chunk
    end
    }

  

end










  
  def destroy
     @stuff=Stuff.find(params[:id])
     @stuff.destroy
     render :json => true    
  end
  

  
  def new
    @stuff = Stuff.new
  end
   
  def create

    #initialize file holder (stuff)
    @stuff = Stuff.new(params[:stuff])
    
    #initialize flag
    @pass = true    

    #get sha1 for this file
    @stuff.container_id = Container.find_by_id_or_sha1(params[:container_id]).id        
    sha1=Digest::SHA1.hexdigest([@stuff.id.to_s,rand].join)
    @stuff.sha1=sha1.to_s
  
    #get the container the file belongs to
    @container=Container.find_by_id_or_sha1(params[:container_id])
    

    #mark the container as not empty
    @container.empty=false


    #mark the container as not expired
    @container.expires = 0

    #increase the total size of the folder
    @container.total_size=@container.total_size+params[:stuff][:file_file_size].to_i
    
    
    #assign expiration time to each file
    if current_user
      if current_user.priviledge=="1"
        @container.exptime=Time.now+14.days
      end
    else
        @container.exptime=Time.now+14.days
    end
    
    #get the allowed space

    if current_user
      space_allowed = current_user.capacity - current_user.storage
    else
      space_allowed = 157286400
    end

    #check to see if there is enough space left
    if space_allowed < params[:stuff][:file_file_size].to_i
      @pass = false
    end 
       

    if (@container.emails.empty?)
             #get sender's name
          sender=params[:sender]
          #get subject if there is any
          subject=params[:subject]
          #get message if there is any
          message=params[:message]
          #send the email  
          @container.sender=sender
          @container.subject=subject
          @container.message=message

      if !(params[:email]=="")
        emails=params[:email].to_s.split(/,/)        
          for email in emails
             #add the email to collection
          a=@container.emails.new(:name=>email)
          a.save
          end
      end


      if(params[:stuff][:notif]==true)
        @container.notif=true
      else
        @container.notif=false
      end

      #set number of downloads to 0
      @container.downloaded=0
      @container.name=@stuff.file_file_name
      #get the password
      @container.password=params[:container_password]
        




    end
   
   @container.save

   

   
      if @pass == true
        @stuff.save
        reduce_storage(params[:stuff][:file_file_size])
        render :json =>  {}
      else
        render :json => {}
      end
    
  end



  def index
   
  end

  def show
    
  end




  def reduce_storage(amount)  

    if(current_user)
      current_user.storage = current_user.storage+amount.to_i
      current_user.save
    else

    end
      
  end

end
