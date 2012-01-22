require 'drb'

class CompressionServer
	def doit
		"Hello"
	end

end


aServerObject=Compression.new
DRb.start_service('druby://ec2-107-21-77-151.compute-1.amazonaws.com:9000',aServerObject)
DRb.thread.join
