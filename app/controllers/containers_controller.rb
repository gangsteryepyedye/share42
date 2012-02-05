class ContainersController < ApplicationController

  require 'zip/zip'
  require 'zip/zipfilesystem'



  #To-Do: 1. Test before_download check
  #       2. Create downloading notifier 




  def compression_ready
    
    @container=Container.find_by_id_or_sha1(params[:id])
    if params[:password]=="238357"
      @container.zipped=true
      @container.save   
    end
      
  end


  




  def download_all
      require 'aws/s3'

      container_id=params[:id]
      email=params[:email]
    

      @container=Container.find_by_id_or_sha1(container_id)   

      #get the zip name
      zip_name=@container.stuffs.first.file_file_name.to_s+".zip"

      AWS::S3::Base.establish_connection!(
        :access_key_id => "AKIAICDXU5SXRWQA5RQA",
        :secret_access_key => "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"
      )
      filename="zip/#{@container.sha1}/#{zip_name}"

      s3obj = nil
    
      s3obj = AWS::S3::S3Object.find(filename, 'filetunnel')
   
   

        @container.downloaded=@container.downloaded+1

        @container.save
          

         if (!email.nil?) 
            query=url_unescape(email)
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

          redirect_to s3obj.url


  end




  def remove


      #destroy zip
      AWS::S3::Base.establish_connection!(
        :access_key_id => "AKIAICDXU5SXRWQA5RQA",
        :secret_access_key => "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"
      )
      

      @container=Container.find_by_id_or_sha1(params[:id])   

      zip_name=@container.stuffs.first.file_file_name.to_s+".zip"
      
      filename="zip/#{@container.sha1}/#{zip_name}"

      s3obj = nil
    
      s3obj = AWS::S3::S3Object.find(filename, 'filetunnel')

      s3obj.delete();




      for stuff in @container.stuffs
        current_user.storage=current_user.storage-stuff.file_file_size
        stuff.destroy
      end
      
      current_user.save
      @container.exptime = Time.now
      @container.expires = 1
      @container.save
      redirect_to '/containers'
  end

  def remove_folder

    @container=Container.find_by_id_or_sha1(params[:id])
    @container.destroy

    redirect_to '/containers'

  end




  def update
    @container=Container.find_by_id_or_sha1(params[:id])   
    @container.update_attributes(params[:container])
    @container.password=params[:container_password]
    if @container.save
      respond_to do |format|
        @message="We have updated the settings for this folder"
        @type="notice"
        format.js{
          render :action=>"notice"
        }
      end 
    else
       @message="Hmm, something went wrong"
        @type="error"
        format.js{
          render :action=>"notice"
        }
    end    
  end




  def show
    #@container=Container.find(Tiny::untiny(params[:id]))
    @container=Container.find_by_id_or_sha1(params[:id])   
    @files=@container.stuffs
    @url=request.url
    
    @link=Container.shorten(@url).short_url
    
    




  end


  def partial_update

    if current_user
    @containers = current_user.containers.where("empty =?",false).find(:all, :order=>'created_at desc',:limit=>6)

     respond_to do |format|      
        format.html {render :partial => "recentcontainer", :layout => false, :locals =>{:containers=>@containers} }  
        format.js  
    end  
    else
     respond_to do |format|      
          format.all{render :nothing => true, :status => 200, :content_type => 'text/html'}
      end 
    end

  end


  def new_transfer
    @container = current_user.containers.new  
    @containers = current_user.containers.where("empty =?",false).find(:all, :order=>'created_at desc',:limit=>6)
    sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
    @container.sha1=sha1.to_s
    @container.save
    @stuff = @container.stuffs.new    
    #remember to clean the unused Container here   
    #need to change the url later
    @tiny_id = "http://127.0.0.1:3000/containers/"+sha1
    @link=Container.shorten(@tiny_id).short_url
  

  end

  def new    
    @user=User.new        
    if(!current_user)
      @container = Container.new    
      #remember to clean the unused Container here   
      sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
      @container.sha1=sha1.to_s
      @container.downloadcap=30
      @container.save
      @stuff = @container.stuffs.new    
      @tiny_id = "http://127.0.0.1:3000/containers/"+sha1
      @link=Container.shorten(@tiny_id).short_url
    else
      redirect_to "/containers"
    end    
  end

  def show_newtransfer
    if(!current_user)
      @container = Container.new    
      sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
      @container.sha1=sha1.to_s
      @container.downloadcap=30
      @container.save
      @stuff = @container.stuffs.new    
      @tiny_id = "http://127.0.0.1:3000/containers/"+sha1
      @link=Container.shorten(@tiny_id).short_url
    else
      @container = current_user.containers.new  
      sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
      @container.sha1=sha1.to_s
      @container.downloadcap=current_user.downloadcap
      @container.save
      @stuff = @container.stuffs.new    
      #remember to clean the unused Container here   
      #need to change the url later
      @tiny_id = "http://127.0.0.1:3000/containers/"+sha1
      @link=Container.shorten(@tiny_id).short_url
    end
    respond_to do |format|      
       format.html {render :partial=>"show_newtransfer",:layout => "layouts/application", :locals=>{:container=>@container,:stuff=>@stuff,:link=>@link} }
       format.js  
    end
  end

  def send_notification



    @container = Container.find_by_id_or_sha1(params[:id])

    stuff_list=[]

    @container.stuffs.each do |s|
      stuff_list<<s.id    
    end   



    Resque.enqueue(Compression,@container.sha1,stuff_list,@container.stuffs.first.file_file_name)


    emails=@container.emails

    name_list=[]
    for c in @container.stuffs
      name_list<<c.file_file_name
    end





    link="http://127.0.0.1:3000/containers/"+@container.sha1


    for e in @container.emails
          Notifier.notify(@container.subject,@container.message,@container.sender,e.name.to_s,name_list,link).deliver
    end
  

    respond_to do |format|      
          format.all{render :nothing => true, :status => 200, :content_type => 'text/html'}
    end 
  end

  helper_method :sort_column, :sort_direction



  def index




    sort=params[:sort]
current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction).where("expires =?",1) 
    filter =  params[:filter]


    state = $redis.get("user_"+current_user.id.to_s)

    @sent_items = current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction)
    @removed_items = current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction).where("expires =?",1) 
    
    if filter.nil?
      if state == "removed"
        if sort.nil?
          @containers = @sent_items
        else
          @containers = @removed_items
        end
      elsif state == "normal"
        @containers = @sent_items 
      end

    elsif filter == "normal"
      @containers = @sent_items
      $redis.set("user_"+current_user.id.to_s,"normal")
    elsif filter == "removed"
      @containers = @removed_items
      $redis.set("user_"+current_user.id.to_s,"removed")
    end

    @state = $redis.get("user_"+current_user.id.to_s)


    downloads=0
    for i in @containers
        downloads=downloads+i.downloaded
    end
    @downloads=downloads
    





    if sort=="exptime"
        @sort_by_name="Expiration date"
    elsif sort=="name"
        @sort_by_name="Folder name"
    elsif sort=="downloaded"
        @sort_by_name="Downloads"
    elsif sort=="total_size"
        @sort_by_name="Folder size"
    elsif sort=="created_at"  
        @sort_by_name="Sent date"
    else
        @sort_by_name="Sent date"
    end

    respond_to do |format|
      format.html
      format.js{render :action=>"update_index"}
    end
end



  def show_container
  
        @container=Container.find_by_id_or_sha1(params[:id])   
        @link=Container.shorten("http://127.0.0.1:3000/containers/"+@container.sha1).short_url
        if(params[:password]==@container.password)      
          respond_to do |format|      
            format.html {render :partial => "container_main_visit",:locals =>{:container=>@container,:files=>@container.stuffs,:link=>@link} }  
            format.js  
          end
        else
          respond_to do |format|      
            format.html 
            format.js 
          end
        end  
  end
















  module Compression

      require 'drb'

      @queue = :compression_queue


      def self.perform(container_id,stuff_list,file_file_name)       
        #outsourcing work to India lol!
        DRb.start_service()
        obj = DRbObject.new(nil,"druby://ec2-107-21-77-151.compute-1.amazonaws.com:9000")
        
        if obj.compress(container_id,stuff_list,file_file_name)
          @container=Container.find_by_id_or_sha1(container_id)
          @container.zipped=true
          @container.save
        end

      end

  end


  private


  def sort_column
    Container.column_names.include?(params[:sort]) ? params[:sort] : "created_at"
  end


  def sort_direction
    %w[asc desc].include?(params[:direction]) ?  params[:direction] : "desc"
  end










end
