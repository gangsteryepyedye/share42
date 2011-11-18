class ContainersController < ApplicationController

  require "tiny.rb"
 

  def update
    @container=Container.find(params[:container_id])


    #send a receipt maybe?



  end



  def new
    
    @remote_ip = request.remote_ip.to_s
        
    if(!current_user)
      temp_user = Tempuser.where("ip =?",@remote_ip).first
      if(temp_user.nil?)
        temp_user = Tempuser.new(:ip=>@remote_ip,:storage=>MAXFSIZE_IP)
        temp_user.save
      end
      @container = temp_user.containers.new    
    else
      @container = current_user.containers.new  
    end

    #remember to clean the unused Container here   
    @container.save
    @stuff = @container.stuffs.new
    @user = User.new
    
    #need to change the url later
    tiny_id = "http://127.0.0.1:3000/containers/"+Tiny::tiny(@container.id).to_s
    #@link=Container.shorten(tiny_id).short_url

  end


  def show
    #@container=Container.find(Tiny::untiny(params[:id]))
    @container=Container.find(params[:id])   
    @files=@container.stuffs
  end

  def index



    @remote_ip = request.remote_ip.to_s
  
    if(!current_user)
        temp_user = Tempuser.where("ip =?",@remote_ip).first
        @containers = temp_user.containers.where("empty =?",false)  
        @container = temp_user.containers.new    

    else
        @container = current_user.containers.new  
        @containers = current_user.containers.where("empty =?",false)  
    end

    #remember to clean the unused Container here   
    @container.save
    @stuff = @container.stuffs.new    
    #need to change the url later
    tiny_id = "http://127.0.0.1:3000/containers/"+Tiny::tiny(@container.id).to_s
    #@link=Container.shorten(tiny_id).short_url



  end






end
