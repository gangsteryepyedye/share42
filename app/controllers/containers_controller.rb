class ContainersController < ApplicationController

  require "tiny.rb"
 

  def update
    @container=Container.find(params[:container_id])


  end





  def new
    
    @remote_ip = request.remote_ip.to_s
        
    if(!current_user)
      temp_user = Tempuser.where("ip =?",@remote_ip).first
      if(temp_user.nil?)
        temp_user = Tempuser.new(:ip=>@remote_ip)
        temp_user.temp_init
      end
      @container = temp_user.containers.new    
      #remember to clean the unused Container here   
      @container.save
      @stuff = @container.stuffs.new
      @user = User.new
      tiny_id = "http://127.0.0.1:3000/containers/"+Tiny::tiny(@container.id).to_s
      
      #need to change the url later
      #@link=Container.shorten(tiny_id).short_url

    else
      redirect_to "/containers"
    end

  
    
  end


  def show
    #@container=Container.find(Tiny::untiny(params[:id]))
    @container=Container.find_by_id_or_sha1(params[:id])   
    @files=@container.stuffs
  end

  def partial_update

    @containers = current_user.containers.where("empty =?",false)  

     respond_to do |format|      
        format.html {render :partial => "container", :layout => false, :locals =>{:containers=>@containers} }  
        format.js  
    end  


  end


  def new_transfer
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

  def index
    @containers = current_user.containers.where("empty =?",false)  
  end






end
