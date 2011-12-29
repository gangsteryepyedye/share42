module ContainersHelper


	def get_size(container)
		total=0
		for s in container.stuffs
			total=total+s.file_file_size
		end
		return number_to_human_size(total)
	end

	def expired(container)
		if Time.at(container.exptime-Time.now).to_i <= 0
			return true
		else
			return false
		end
	end



	def expiration_day(container)
		interval = Time.at(container.exptime-Time.now).day

		if Time.at(container.exptime-Time.now).to_i <= 0
			return "Expired"
		else
			return interval.to_s + " Days"
		end
	end
		
	def need_pwd(container)


		if(!current_user)
			if((container.password.nil?)||(container.password.empty?))
				return false
			else
				return true
			end
		else
			if(container.user_id!=current_user.id)
				if((container.password.nil?)||(container.password.empty?))
					return false
				else
					return true
				end					
			else
				return false			
			end
		end

	end
		

end
