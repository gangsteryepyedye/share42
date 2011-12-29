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
        end
    end        

    AWS::S3::Base.establish_connection!(
    :access_key_id => "AKIAICDXU5SXRWQA5RQA",
    :secret_access_key => "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"
    )
    filename=CGI::unescape(@stuff.file.to_s.scan(/nel\/([^"]*)\?/).first.first)

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

    @stuff = Stuff.new(params[:stuff])
    @stuff.container_id = Container.find_by_id_or_sha1(params[:container_id]).id        
    sha1=Digest::SHA1.hexdigest([@stuff.id.to_s,rand].join)
    @stuff.sha1=sha1
  


    @container=Container.find_by_id_or_sha1(params[:container_id])
    @container.empty=false
    
    if current_user
      if current_user.priviledge=="1"
        @container.exptime=Time.now+14.days
      end
    else
        @container.exptime=Time.now+14.days
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


      if(@stuff.notif==true)
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






    if current_user
      left=current_user.capacity-current_user.storage
    else
      left=157286400
    end

    if(!@stuff.validate_storage_left(params[:stuff],left))
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

    if(current_user)
      current_user.storage = current_user.storage+amount
      current_user.save
    else

    end
      
  end

end
