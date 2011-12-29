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

  def update_password
    @user=current_user
    old_password=params[:old_password]
    new_password=params[:new_password]

    if @user.change_password(old_password,new_password)
      respond_to do |format|
        format.js{
          render :action=>"success_profile_update"
        }
      end 
    else
      respond_to do |format|
        format.js{
          render :action=>"wrong_password"
        }
      end 
    end    
  end

  def update_email
    @user=current_user
    new_email=params[:new_email]

    if @user.change_email(new_email)
      respond_to do |format|
        format.js{
          render :action=>"success_email_update"
        }
      end 
    else
      respond_to do |format|
        format.js{
          render :action=>"wrong_email"
        }
      end 
    end    
  end

  def update_notifications
     @user=current_user
     
     option=params[:notification]

     if option=="first"
        @user.limitnotif=params[:user][:limitnotif]
        @user.everytime=false
        @user.save
     elsif option=="every"
        @user.limitnotif=params[:user][:limitnotif]
        @user.everytime=true
        @user.save
     end 

      respond_to do |format|
        @message="We have updated your settings"
        @type="notice"
        format.js{
          render :action=>"notice"
        }
      end 
  end 



    





end
