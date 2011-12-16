class User < ActiveRecord::Base
  has_many :containers
  attr_accessible :email, :password, :password_confirmation, :priviledge
  
  attr_accessor :password
  before_save :encrypt_password
  
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates_presence_of :email
  validates_uniqueness_of :email
  
  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.passowrd_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
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




  def free_init
      self.capacity=1073741824 
      self.priviledge=1
      self.spf=157286400
      self.downloadcap=2147483648 
      self.storage=0
  end

  def personal_init
      self.capacity=5368709120 
      self.priviledge=3
      self.spf=5368709120
      self.downloadcap=53687091200 
      self.storage=0
  end

  def premium_init
      self.capacity=21474836480 
      self.priviledge=4
      self.spf=5368709120
      self.downloadcap=0
      self.storage=0
      self.storage=0
  end

  def plus_init
      self.capacity=107374182400 
      self.priviledge=5
      self.spf=5368709120
      self.downloadcap=0 
      self.storage=0
  end

  def instant_init

  end








end