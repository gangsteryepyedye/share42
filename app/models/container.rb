class Container < ActiveRecord::Base
  has_many :stuffs, :dependent => :destroy
  belongs_to :user
  belongs_to :temp_user

  def self.shorten(url)
  	 return Googl.shorten(url)
  end



end
