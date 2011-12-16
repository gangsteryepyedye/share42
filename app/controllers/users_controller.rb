class UsersController < ApplicationController
  
    
  def new
    @user = User.new
    
    
  end

  def new_free
    @user = User.new
  end



  def create
    @user = User.new(params[:user])

    if(!params[:stripeToken].nil?)
      createPremium
      #do more things here  
    else
      
      @user.free_init
      if @user.save
        redirect_to '/containers', :notice => "Signed up!"
      else
        render :action => "new_free"
      end 
    
   
    end



   
  end


  def createPremium

   
   
    # get the credit card details submitted by the form
    token = params[:stripeToken]

    # set your secret key: remember to change this to your live secret key in production
    # see your keys here https://manage.stripe.com/account
    Stripe.api_key = "8npiKgDByhdpXj4sB5kgEEM6HujsRuJR"

    # create the charge on Stripe's servers - this will charge the user's card
    charge = Stripe::Charge.create(
      :amount => 599, # amount in cents, again
      :currency => "usd",
      :card => token,
      :description => "premium charge"
    )


  end



end
