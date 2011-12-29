class PagesController < ApplicationController
  def pricing
  end

  def about
  end

  def account
    @containers = current_user.containers.where("empty =?",false)
    downloads=0
    for i in @containers
        downloads=downloads+i.downloaded
    end
    @downloads=downloads  
  end

end
