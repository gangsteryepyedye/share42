class Tempuser < ActiveRecord::Base
	has_many :containers




  	def temp_init
      	self.capacity=1073741824 
      	self.priviledge=0
      	self.spf=1073741824
      	self.downloadcap=2147483648 
      	self.storage=0
      	self.save
  	end



end
