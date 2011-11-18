class Notifier < ActionMailer::Base
   default :from => "238357@gmail.com"
  
  def notify(subject,message,sender,recipient,filename)
     
    @subject = subject
    @message = message
    @sender = sender
  	@recipient = recipient
    @sub = subject
    @filename=filename
    	mail(:to => @recipient,
    		:from => @sender,
         	:subject => @subject) do |format|
      	  	format.html { render 'notify_email' }
    	end
	 	
  	
  end


  def confirm(sender,emails)





  end



end



