class Stuff < ActiveRecord::Base
  belongs_to :container
  
  
  #add current user later
   validates_attachment_size :file, :less_than=>200.megabyte

  
  
  has_attached_file :file,
     :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/s3.yml",
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

  def validate_storage_left(stuff,storage)
  
    self.errors.add(:file,"Not enough space left") if stuff[:file].size>storage

    return true if self.errors.empty?
    return false

  end

   def to_jq_upload
  {
    "name" => read_attribute(:file)
   }
 end



  
  
      
end
