class ContainersController < ApplicationController





  require 'zip/zip'
  require 'zip/zipfilesystem'
  require 'resque_scheduler'


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
      
      ip=request.remote_ip.to_s 

      Spacecop.log_download(ip,params[:id].to_s,"zip")

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
   
      @filelist = []

      for stuff in @container.stuffs 

        @filelist.push(stuff.file_file_name)
      
      end


      @container.downloaded = @container.downloaded+1
      @container.updated_at = Time.now
      @container.save
      


         if (!email.nil?) 
            query=url_unescape(email)
            @email=@container.emails.where("name =?",query).first

            if(!@email.nil?)
              @email.downloads=@email.downloads+1
              @email.save
              @link = "http://www.42share.com/containers/"+@container.sha1

              if @email.downloads == 1
                if @container.user_id.nil?
                  Notifier.download_notify(@email.name,@container.sender,@link,@filelist).deliver
                else
                  @user=User.find(@container.user_id)
                  if (@user.everytime==true||(@user.everytime==false&&@email.downloads==1))                  
                    Notifier.download_notify(@email.name,@user.email,@link,@filelist).deliver
                  end
                end
              end    
            end
          end   

          redirect_to s3obj.url


  end




  def remove

      @container=Container.find_by_id_or_sha1(params[:id])   
      zip_name = @container.stuffs.first.file_file_name.to_s+".zip"
      @user=User.find(current_user.id)

      for stuff in @container.stuffs
        @user.storage = @user.storage-stuff.file_file_size
        stuff.destroy
      end
      
      @user.save
      @container.exptime = Time.now
      @container.state = "removed"
      @container.save

      if @container.is_single!=true
        Resque.enqueue_in(10.minutes,Deletion,params[:id],current_user.id,zip_name)
      end
      
      redirect_to '/containers'
  end



  #remove folder along with all the files
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
    @tiny_id = "http://www.42share.com/containers/"+sha1
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
      @tiny_id = "http://www.42share.com/containers/"+sha1
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
      @tiny_id = "http://www.42share.com/containers/"+sha1
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
      @tiny_id = "http://www.42share.com/containers/"+sha1
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


    if stuff_list.count!=1
      Resque.enqueue(Compression,@container.sha1,stuff_list,@container.stuffs.first.file_file_name)
    else
      @container.is_single=true
      @container.save
    end

    emails=@container.emails

    name_list=[]
    for c in @container.stuffs
      name_list<<c.file_file_name
    end


    link="http://www.42share.com/containers/"+@container.sha1

    #send out emails to recipients
    for e in @container.emails
          Notifier.notify(@container.subject,@container.message,@container.sender,e.name.to_s,name_list,link).deliver
    end

  
    #send out a confirmation email
    if @container.sender
          Notifier.confirm(@container.sender,@container.emails,name_list,link).deliver
    end
    

    respond_to do |format|      
          format.all{render :nothing => true, :status => 200, :content_type => 'text/html'}
    end 
  end

  helper_method :sort_column, :sort_direction



  def index




    sort=params[:sort]
    filter =  params[:filter]
    search = params[:search]

    state = $redis.get("user_"+current_user.id.to_s)


    if filter=="search"
      @relevant_items=[]
      for c in current_user.containers.where("empty =?",false).where("state !=?","removed")
        temp_item = c
        file_names = []
        for f in c.stuffs
          if f.file_file_name.downcase.include?(search.downcase)
            file_names << f.file_file_name
          end
        end
        temp_item[:files]=file_names
        if !(file_names.empty?)
          @relevant_items << temp_item
        end
      end


    end



    @sent_items = current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction).where("state !=?","removed")
    @removed_items = current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction).where("state =?","removed") 
    @personal_items = current_user.containers.where("empty =?",false).order(sort_column+" "+sort_direction).where("state =?","personal") 




    
    if filter.nil?
      if state == "removed"
        if sort.nil?
          @containers = @sent_items
        else
          @containers = @removed_items
        end
      elsif state == "normal"
        @containers = @sent_items 
      elsif state == "personal"
        @containers = @personal_items 
      elsif state == "search" 
        $redis.set("user_"+current_user.id.to_s,"normal")        
        @containers = @sent_items    
      end

    elsif filter == "normal"
      @containers = @sent_items
      $redis.set("user_"+current_user.id.to_s,"normal")
    elsif filter == "removed"
      @containers = @removed_items
      $redis.set("user_"+current_user.id.to_s,"removed")
    elsif filter == "personal"
      @containers = @personal_items
      $redis.set("user_"+current_user.id.to_s,"personal") 
    elsif filter == "search"  
      @containers = @relevant_items
      $redis.set("user_"+current_user.id.to_s,"search")             
    end

    @state = $redis.get("user_"+current_user.id.to_s)


    





    if sort=="exptime"
        @sort_by_name="Expiration date"
    elsif sort=="name"
        @sort_by_name="Name"
    elsif sort=="downloaded"
        @sort_by_name="Downloads"
    elsif sort=="total_size"
        @sort_by_name="Size"
    elsif sort=="created_at"  
        @sort_by_name="Created"
    else
        @sort_by_name="Created"
    end

    respond_to do |format|
      format.html
      format.js{render :action=>"update_index"}
    end
end



  def show_container
  
        @container=Container.find_by_id_or_sha1(params[:id])   
        @link=Container.shorten("http://www.42share.com/containers/"+@container.sha1).short_url
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






module HerokuAutoScaler
   module AutoScaling
      def after_perform_scale_down(*args)
        HerokuAutoScaler.scale_down!
      end
  
      def after_enqueue_scale_up(*args)
        HerokuAutoScaler.scale_up!
      end
 
      def on_failure(e, *args)
        Rails.logger.info("Resque Exception for [#{self.to_s}, #{args.join(', ')}] : #{e.to_s}")
        HerokuAutoScaler.scale_down!
      end
    end
  
    extend self
  
    attr_accessor :ignore_scaling
  
    def clear_resque
      Resque::Worker.all.each {|w| w.unregister_worker}
    end
  
    def configure(&block)
      instance_eval(&block) if block_given?
    end
  
    def scale_by(&block)
      self.scaling_block = block
    end
  
    def scale_down!
      Rails.logger.info "Scale down j:#{job_count} w:#{resque_workers}"
      self.heroku_workers = 0 if job_count == 0 && resque_workers == 1
    end
  
    def scale_up!
      return if ignore_scaling
      pending = job_count
      self.heroku_workers = workers_for(pending) if pending > 0
    end
  
    private
  
    attr_accessor :scaling_block
  
    def heroku
      if ENV['HEROKU_USER'] && ENV['HEROKU_PASSWORD'] && ENV['HEROKU_APP']
       @heroku ||= Heroku::Client.new(ENV['HEROKU_USER'], ENV['HEROKU_PASSWORD'])
      else
        false
      end
    end
  
    def heroku_workers=(qty)
      heroku.set_workers(ENV['HEROKU_APP'], qty) if heroku
    end
  
    def job_count
      Resque.info[:pending]
    end
  
   def resque_workers
      Resque.info[:working]
    end
  
    def workers_for(pending_jobs)
      if scaling_block
        scaling_block.call(pending_jobs)
      else
       [
          { :workers => 1, # This many workers
            :job_count => 1 # For this many jobs or more, until the next level
        },
          { :workers => 2,
            :job_count => 15
       },
         { :workers => 3,
           :job_count => 25
       },
         { :workers => 4,
           :job_count => 40
       },
         { :workers => 5,
          :job_count => 60
       }
     ].reverse_each do |scale_info|
        # Run backwards so it gets set to the highest value first
         # Otherwise if there were 70 jobs, it would get set to 1, then 2, then 3, etc
 
         # If we have a job count greater than or equal to the job limit for this scale info
         if pending_jobs >= scale_info[:job_count]
           return scale_info[:workers]
         end
       end
     end
   end
 end









  module Compression


      require 'drb'
      extend HerokuAutoScaler::AutoScaling

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

  module Deletion

      require 'aws/s3'
      extend HerokuAutoScaler::AutoScaling



    @queue = :delete_queue


    def self.perform(container_id,user_id,zip_name)
      


      @container=Container.find_by_id_or_sha1(container_id)   
      @user=User.find(user_id)

      for stuff in @container.stuffs
        @user.storage = @user.storage-stuff.file_file_size
        stuff.destroy
      end
      
      @user.save
      @container.exptime = Time.now
      @container.state = "removed"
      @container.save

      #destroy zip
      AWS::S3::Base.establish_connection!(
        :access_key_id => "AKIAICDXU5SXRWQA5RQA",
        :secret_access_key => "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"
      )
      

      
      filename="zip/#{@container.sha1}/#{zip_name}"

      s3obj = nil
    
      s3obj = AWS::S3::S3Object.find(filename, 'filetunnel')

      s3obj.delete();




   



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
