class Stuff < ActiveRecord::Base
  belongs_to :container
  
  
  #add current user later
   validates_attachment_size :file, :less_than=>200.megabyte

  
  has_attached_file :file,
     :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/s3.yml",
       :s3_permissions => :private,
     :path => "/:style/:id/:filename"

  
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
