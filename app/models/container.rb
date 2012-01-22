class Container < ActiveRecord::Base
  has_many :stuffs, :dependent => :destroy
  has_many :emails, :dependent => :destroy	
  belongs_to :user

  def self.shorten(url)
  	 return Googl.shorten(url)
  end


  def expire
  	self.destroy
  end


  def self.find_by_id_or_sha1(id)
     Container.find_by_sha1(id)
  end


  def to_param
    sha1
  end








end
