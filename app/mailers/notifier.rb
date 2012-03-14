class Notifier < ActionMailer::Base
   default :from => "238357@gmail.com"
  



  def plan_support(sender,message)

    @message=message
    @sender=sender

    mail(:to=>"238357@gmail.com",:subject=>"Question regarding the plan") 

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


  def download_notify(email,recipient,link)
    
    if email.nil?||email.empty?
      @sender="An anonymous user"
    else
      @sender=email
    end

    subject="File Download Notification from 42Share.com"
    @link=link
    @recipient = recipient
    
    mail(:to=>@recipient,
         :subject=>subject) do |format|
          format.html {render 'notify_download'}
    end
  end
  


  def notify(subject,message,sender,recipient,namelist,link)
     
    if subject.nil?||subject.empty?
      @subject="You have a file(s) waiting"
    else
      @subject=subject
    end
    
    @message = message

    if sender.nil?||sender.empty?
      @sender ="Someone"
    else
      @sender=sender
    end
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





  def confirm(sender,emails)





  end



end



