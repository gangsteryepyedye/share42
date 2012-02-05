class PagesController < ApplicationController
  
  def privacy


  end


  def pricing
    if current_user
      redirect_to '/pages/account'
    end

  end


  def undefined

  end

  
  def about


  end

  def account



    Stripe.api_key = "8npiKgDByhdpXj4sB5kgEEM6HujsRuJR"

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
