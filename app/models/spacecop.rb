class Spacecop < ActiveRecord::Base



    def self.add_new_ip(ip)
      
      if $redis.get("all_ips").nil?
        $redis.set("all_ips","[]")
      end

      ips = JSON.parse($redis.get("all_ips"))

      if !ips.include?(ip)
        ips.push(ip)
      end

      result_string = ips.to_json

      $redis.set("all_ips",result_string) 

    end







	def self.log_upload(ip,stuff)

       Spacecop.add_new_ip(ip)

	   ip_key_total = ip+"_total"
	   ip_key_today = ip+"_"+Date.today.to_s
	   stuff_size = stuff[:file_file_size].to_i

       ip_stats_total = $redis.hgetall(ip_key_total)
       ip_stats_today = $redis.hgetall(ip_key_today) 

       if ip_stats_total == {}
       		$redis.hmset(ip_key_total,"upload","0")
       end

       if ip_stats_today == {}
       		$redis.hmset(ip_key_today,"upload","0")
       end

       ip_upload_total = $redis.hget(ip_key_total,"upload").to_i			 
       ip_upload_today = $redis.hget(ip_key_today,"upload").to_i

       #fire warning calls here



       ip_upload_total = ip_upload_total.to_i + stuff_size
       ip_upload_today = ip_upload_today.to_i + stuff_size

           #if the ip uses over
       if ip_upload_today > 10737418240
       	Notifier.hacker_upload_alert(ip,ip_upload_total.to_s,ip_upload_today.to_s).deliver
       end	


       $redis.hset(ip_key_total,"upload",ip_upload_total.to_s)
       $redis.hset(ip_key_today,"upload",ip_upload_today.to_s)

    end


    def self.log_download(ip,object_id,identifier)
     				

        add_new_ip(ip)

    	if identifier == "zip"
    		object_id = "container_" + object_id.to_s
    	else
    		object_id = "stuff_" + object_id.to_s
    	end





      	download_key_total = object_id.to_s + "_" + ip + "_total"
      	download_key_today = object_id.to_s + "_" + ip + Date.today.to_s
 
      	download_stats_total = $redis.hgetall(download_key_total)
      	download_stats_today = $redis.hgetall(download_key_today)

      	if download_stats_total == {}
      		$redis.hmset(download_stats_total,"ban","false","download","0")
      	end

      	if download_stats_today == {}
      		$redis.hmset(download_stats_today,"ban","false","download","0")
      	end	

      	ip_download_total = $redis.hget(download_key_total,"download").to_i
      	ip_download_today = $redis.hget(download_key_today,"download").to_i

      	ip_download_total = ip_download_total.to_i + 1
      	ip_download_today = ip_download_today.to_i + 1

      	if ip_download_today > 10
	       	Notifier.hacker_download_alert(ip,object_id,ip_download_total.to_s,ip_download_today.to_s).deliver
      	end


      	$redis.hset(download_key_total, "download", ip_download_total)
      	$redis.hset(download_key_today, "download", ip_download_today)


    end

    



    






end
