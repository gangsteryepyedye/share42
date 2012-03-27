class Notifier < ActionMailer::Base
   default :from => "noreply@42share.com"


  def hacker_upload_alert(ip,upload_today,upload_total) 

    @ip = ip
    @upload_today = upload_today
    @upload_total = upload_total

    mail(:to=>"noreply@42share.com",:subject=>"Hacker Upload Alert")

  end  

  def hacker_download_alert(ip,object_id,download_today,download_total)

    @ip = ip
    @object_id = object_id
    @download_today = download_today
    @download_total = download_total

    mail(:to=>"noreply@42share.com",:subject=>"Hacker Download Alert")

  end


  def plan_support(sender,message)

    @message=message
    @sender=sender

    mail(:to=>"noreply@42share.com",:subject=>"Question regarding the plan") 

  end



  def limit_notify(recipient,link)

    @subject = "Hi, One of your folders on 42Share has reached its download limit"    

    subject=@subject

    @link = link


    mail(:to=>recipient,
         :subject=>subject) do |format|
          format.html {render 'notify_limit'}
    end


  end


  def download_notify(email,recipient,link,namelist)
    
    if email.nil?||email.empty?
      @sender="An anonymous user"
    else
      @sender=email
    end

    subject="Your file(s) have been downloaded from 42Share.com"
    @link=link
    @recipient = recipient
    @filenames=namelist

    if !@recipient.nil?  
      mail(:to=>@recipient,
           :subject=>subject) do |format|
            format.html {render 'notify_download'}
      end
    end


  end
  


  def notify(subject,message,sender,recipient,namelist,link)
 
    
    @message = message

    if sender.nil?||sender.empty?
      @sender ="Someone"
    else
      @sender = sender
    end
 

    @subject = @sender+" has sent you file(s) via 42share"

  	@recipient = recipient
    @sub = @subject
    @filenames=namelist
    @count = namelist.count
    @link = link.to_s+"?email="+@recipient.to_s

    mail(:to => recipient,
       	:subject => @subject) do |format|
    	  	format.html { render 'notify_email' }
    end

  	
  end


  def password_reset(user)
    @user = user
    mail :to => user.email, :subject => "Password Reset"
  end





  def confirm(sender,recipients,namelist,link)

    @subject = "Thanks for using 42share - file(s) sent to recipients"

    @sender = sender

    @reps = recipients

    @filenames = namelist

    @link = Container.shorten(link).short_url

    mail(:to => @sender, 
      :subject => @subject) do |format|
        format.html {render 'confirm_email'}
    end

  end






end



