class Notifier < ActionMailer::Base
   default :from => "238357@gmail.com"
  
  def notify(subject,message,sender,recipients)
     
    @subject = subject
    @message = message
    @sender = sender
 

    for r in recipients
    	@recipient = r
    	mail(:to => @recipient,
    		:from => @sender,
         	:subject => @subject do |format|
      	  	format.html { render 'notify_email' }
    	end
	end  	
  	
  end


end



