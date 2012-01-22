module Compression
  @queue = :compression_queue


  def self.perform(container_id,email)

  	  @container=Container.find_by_id_or_sha1(container_id)   

      file_name = @container.stuffs.first.file_file_name+".zip"
      signature=Digest::SHA1.hexdigest(Time.now.to_s+file_name)
      t = Tempfile.new("#{signature}my-temp-filename.zip")
      Zip::ZipOutputStream.open(t.path) do |z|
        @container.stuffs.each do |file|
          title = file.file_file_name
          z.put_next_entry(title)
          z.print IO.read(file.file.to_file)
        end
      end
      send_file t.path, :type => 'application/zip',
                             :disposition => 'attachment',
                             :filename => file_name
      t.close
    

      @container.downloaded=@container.downloaded+1
      @container.save
      



      if (!email.nil?) 
        query=url_unescape(email)
      
      @email=@container.emails.where("name =?",query).first
        if(!@email.nil?)
          @email.downloads=@email.downloads+1
          @email.save
        end
      end   



  end




end