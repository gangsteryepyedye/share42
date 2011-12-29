class ContainersController < ApplicationController

  require 'zip/zip'
  require 'zip/zipfilesystem'


  def download_all




    #check if the user hits the download limit





      @container=Container.find_by_id_or_sha1(params[:id])   

      file_name = @container.stuffs.first.file_file_name+".zip"
      signature=Digest::SHA1.hexdigest(Time.now.to_s+file_name)
      t = Tempfile.new("#{signature}my-temp-filename.zip")
      Zip::ZipOutputStream.open(t.path) do |z|
        @container.stuffs.each do |file|
          title = file.file_file_name
          z.put_next_entry(title)
          z.print IO.read(file.file.to_file)
        end
      end
      send_file t.path, :type => 'application/zip',
                             :disposition => 'attachment',
                             :filename => file_name
      t.close
    

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

  end




  def remove
      @container=Container.find_by_id_or_sha1(params[:id])   
      for stuff in @container.stuffs
        current_user.storage=current_user.storage-stuff.file_file_size
        stuff.destroy
      end
      
      current_user.save
      @container.exptime=Time.now
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
    @container.sha1=sha1
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
      @container.sha1=sha1
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
      @container.sha1=sha1
      @container.save
      @stuff = @container.stuffs.new    
      @tiny_id = "http://127.0.0.1:3000/containers/"+sha1
      @link=Container.shorten(@tiny_id).short_url
    else
      @container = current_user.containers.new  
      sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
      @container.sha1=sha1
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



  def index
    @containers = current_user.containers.where("empty =?",false)  
    downloads=0
    for i in @containers
        downloads=downloads+i.downloaded
    end
    @downloads=downloads
  end



  def show_container
  
        @container=Container.find_by_id_or_sha1(params[:id].to_i)   
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


end
