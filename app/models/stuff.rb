class Stuff < ActiveRecord::Base
  belongs_to :container
  
  

  after_create :move_upload_from_temp_to_final_resting_place

  has_attached_file :file,
     :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/s3.yml",
       :s3_permissions => :private,
     :path => "/:style/:id/:filename"



def move_upload_from_temp_to_final_resting_place
  # Rename the image on s3 (more of a move)
  AWS::S3::Base.establish_connection!(:access_key_id => 'AKIAICDXU5SXRWQA5RQA',:secret_access_key => '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')
  
  if self.legal==true
    new_name = self.file.path
    old_name = "/#{self.file_file_name}"
    (1..5).each do |try|
      begin
        # Copy the file
        AWS::S3::S3Object.rename(old_name, new_name, 'filetunnel', :copy_acl => :true)
        break
      rescue Exception => e
        sleep 1
      end
    end
  else


  end

end
  
  def shorten (string, count = 10)
    if string.length >= count 
      shortened = string[0, count]
      splitted = shortened.split(/\s/)
      words = splitted.length
      splitted[0, words-1].join(" ") + ' ...'
    else 
      string
    end
  end

  def validate_storage_left(stuff,left)
  
    self.errors.add(:file,"Not enough space left") if stuff[:file].size>left

    return true if self.errors.empty?
    return false

  end



   def to_jq_upload
  {
    "name" => read_attribute(:file)
   }
 end


  def self.find_by_id_or_sha1(id)
    Stuff.find_by_id(id) || Stuff.find_by_sha1(id)
  end


  def to_param
    sha1
  end
  
  
      
end
