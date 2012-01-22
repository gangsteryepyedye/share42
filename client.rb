require 'drb'


DRb.start_service()
obj = DRbObject.new(nil,"druby://ec2-107-21-77-151.compute-1.amazonaws.com:9000")


p obj.compress(410,"test")