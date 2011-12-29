class Notifier < ActionMailer::Base
   default :from => "238357@gmail.com"
  
  def notify(subject,message,sender,recipient,namelist,link)
     
    if subject.nil?
      @subject="Senditu.com - You have a file(s) waiting"
    else
      @subject=subject
    end
    
    @message = message

    if sender.nil?
      @sender ="Someone"
    else
      @sender=sender
    end
  	@recipient = recipient
    @sub = subject
    @filenames=namelist
    @count = namelist.count
    @link = link.to_s+"?email="+@recipient.to_s

    mail(:to => recipient,
       	:subject => subject) do |format|
    	  	format.html { render 'notify_email' }
    end

  	
  end








  def confirm(sender,emails)





  end



end



