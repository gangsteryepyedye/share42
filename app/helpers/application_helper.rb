module ApplicationHelper


	def shorten (string, word_limit = 20)
	  words = string.split(/\s/)
	  if words.size >= word_limit 
	    last_word = words.last
	    words[0,(word_limit-1)].join(" ") + '...' 
	  else 
	    string
	  end
	end

	def sortable(column,title)
		direction = column == sort_column && sort_direction == "asc" ? "asc" : "desc"
		if column == "name"
			direction = "asc"
		end				
  		link_to title, {:sort => column, :direction => direction}, :remote=>true
	end


	def read_filtered(option,title)
		link_to title, {:filter=>option}, :remote=>true
	end
		


end
