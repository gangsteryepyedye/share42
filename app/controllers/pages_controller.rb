class PagesController < ApplicationController
  def pricing
  end


  def undefined

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

    if !current_user.customer_id.nil? 
      @payments = Stripe::Charge.all(:customer => current_user.customer_id).data
    end  


  end

end
