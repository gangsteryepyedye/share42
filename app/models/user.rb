class User < ActiveRecord::Base
  has_many :containers, :dependent => :destroy
  attr_accessible :email, :password, :password_confirmation, :priviledge
  
  attr_accessor :password
  before_save :encrypt_password
  before_create { generate_token(:auth_token) }

  
 
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates :email,   
            :presence => true,   
            :uniqueness => true,   
            :format => { :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }  





def send_password_reset
  generate_token(:password_reset_token)
  self.password_reset_sent_at = Time.zone.now
  save!
  Notifier.password_reset(self).deliver
end

def generate_token(column)
  begin
    self[column] = SecureRandom.urlsafe_base64
  end while User.exists?(column => self[column])
end          





  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.passowrd_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
    
  def change_password(old_password,new_password)
    
    if self.passowrd_hash == BCrypt::Engine.hash_secret(old_password, self.password_salt)
      self.password_salt = BCrypt::Engine.generate_salt
      self.passowrd_hash = BCrypt::Engine.hash_secret(new_password, password_salt)
      self.save
      return true
    else
      return false
    end

  
  end 

  def change_email(new_email)

    self.email=new_email  

    if self.save
      return true
    else
      return false
    end

  end




  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.passowrd_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end





  def increase_storage(file_size)
    if self.capacity-self.storage-file_size < 0
      return false
    else
      self.storage=self.storage+file_size
      self.save
      return true
    end
  end

  def reduce_download(file_size)
    if self.downloadcap-file_size < 0
      return false
    else
      self.downloadcap = self.downloadcap - file_size
      self.save
      return true
    end

  end



  #initiate settings for a single user account
  def free_init(first_time)
      self.capacity=10737418240 
      self.priviledge="1"
      self.spf=1073741824
      self.downloadcap=99999
      if first_time==true
        self.storage=0
      end  
  end

  #initiate/change settings for a personal account based on the value of 'first time' boolean variable
  def personal_init(first_time)
      self.capacity=107374182400 
      self.priviledge="3"
      self.spf=2147483648     
      self.downloadcap=99999
      if first_time==true
        self.storage=0
      end  
  end


  #initiate settings for a premium account based on the value of 'first time' boolean variable
  def premium_init(first_time)
      self.capacity=1073741824000
      self.priviledge="4"
      self.spf=5368709120
      self.downloadcap=99999
      if first_time==true
        self.storage=0
      end  
  end






end