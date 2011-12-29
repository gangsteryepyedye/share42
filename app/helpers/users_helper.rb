module UsersHelper

	def return_plans(user)
		
		p=user.priviledge
		
		if p=="1"
			return "Free"
		elsif p=="2"
			return "Instant"
		elsif p=="3"
			return "Personal"
		elsif p=="4"
			return "Premium"
		elsif p=="5"
			return "Plus"
		end
	end


	def return_available_space(user)

		available_space=((user.capacity.to_f-user.storage.to_f)/1073741824).round(2)
		storage=(user.capacity.to_f/1073741824).round(2)

		return available_space.to_s+'/'+storage.to_s+"GB"


	end

end
