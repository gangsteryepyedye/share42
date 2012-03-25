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
  s3 = AWS::S3.new(:access_key_id => 'AKIAICDXU5SXRWQA5RQA',:secret_access_key => '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')
  
    new_name = self.file.path[1..-1]
    old_name = "#{self.file_file_name}"
    (1..5).each do |try|
      begin
        # Copy the file
        bucket = s3.buckets['filetunnel']  
        old_obj = bucket.objects[old_name]
        new_obj = old_obj.move_to(new_name)

        break
      rescue Exception => e
        sleep 1
      end
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
