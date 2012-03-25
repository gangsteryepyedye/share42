require 'spec_helper'


describe Spacecop do

	it "increases the upload size of 999.999.999.999 by 1GB " do
		  	ip = "999.999.999.999"
		   	stuff = {:file_file_size=>2147483648}

		   	ip_key_total = ip+"_total"
	   		ip_key_today = ip+"_"+Date.today.to_s
    		$redis.hmset(ip_key_total,"upload","0","download","0")
    		$redis.hmset(ip_key_today,"upload","0","download","0")

   			Spacecop.log_upload(ip,stuff)

   			ip_upload_total = $redis.hget(ip_key_total,"upload")			 
       		ip_upload_today = $redis.hget(ip_key_today,"upload")

   			ip_upload_total.should = 2147483648.to_s
   			ip_upload_today.should = 2147483648.to_s

	end



end