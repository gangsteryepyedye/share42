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

end
