module ContainersHelper


	def get_size(container)
		total=0
		for s in container.stuffs
			total=total+s.file_file_size
		end
		return number_to_human_size(total)
	end

	def download_tracker(container)
		if container.downloaded == 0 
			return "Not yet"
		else
			return downloaded+"times"
		end

	end

	def expiration_day(container)
		interval = Time.at(container.exptime-Time.now).day

		if interval <= 0
			return "Expired"
		else
			return interval.to_s + " Days"
		end
	end
		

		

end
