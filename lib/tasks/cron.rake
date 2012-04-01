



desc "This task is called by the Heroku cron add-on"
task :cron => :environment do
  if Time.now.hour % 1 == 0 # run every four hours
    puts "Calling webpage"
	req = Net::HTTP.get(URI.parse('http://www.42share.com'))
    puts "done."
  end

  if Time.now.hour == 0 # run at midnight
  	for container in Container.all
  		if((Time.now-container.updated_at)/3600/48>30)
  			if container.user_id.nil?
  				if container.empty?
  					container.destroy	
  				else
  					container.remove(-1)
  				end
  			else
  			    priviledge = User.find(container.user_id).priviledge
  			    if priviledge == "1"
  					container.remove(container.user_id)	
  			    end
  			end
  		end
  	end
  end
end