class UsersController < ApplicationController
  
      
  def sign_in(user)
    cookies[:auth_token] = user.auth_token
    current_user = user
  end


    
  def new
    @user = User.new
    
    
  end

  def new_free
    @user = User.new
  end


  def create


    # get the plan
    plan = params[:planSelect]

    #get the Api key
    Stripe.api_key = "HX1SRH5xdd1BZDgkRfzsWKSV4H66XfKe"
    # get the credit card details submitted by the form
    token = params[:stripeToken]

    #create namespace
    @user = User.new(params[:user])



    if plan!="free"
      
      #call Stripe API to put the user on its billing system
      customer = Stripe::Customer.create(
        :card => token,
        :plan => plan,
        :email => @user.email,
        :description => plan
      )

      @user.customer_id = customer.id

    end

    #update account capscity based on params[:planSelect]

    if plan=="free"
      @user.free_init(true)

    elsif plan=="personal"
      @user.personal_init(true)
    elsif plan=="premium"
      @user.premium_init(true)
    elsif plan=="plus"
      @user.plus_init(true)
    end


      if @user.save
        @user.send_email_confirmation
        if plan!="free"
          Notifier.send_invoice(@user).deliver
        end      
        sign_in @user
        $redis.set("user_"+@user.id.to_s,"normal")
        redirect_to '/new_transfer', :notice => "You have just been sent an email to confirm your email address. Please click on the link in the email to active your account."
      else
        if plan.nil?
          render :action => "new"
        else
          render :action => "new_free"
        end
      end 
    
   
  end







  def upgrade

    Stripe.api_key = "HX1SRH5xdd1BZDgkRfzsWKSV4H66XfKe"

    # get the credit card details submitted by the form
    token = params[:stripeToken]

    # get the plan
    plan = params[:plan]



  if current_user.customer_id.nil?
    # create the charge on Stripe's servers - this will charge the user's card
     customer = Stripe::Customer.create(
      :card => token,
      :plan => plan,
      :email => current_user.email,
      :description=>plan
    )

    #save customer id for later identification
    current_user.customer_id=customer.id
    current_user.save
  else

    customer=Stripe::Customer.retrieve(current_user.customer_id)
    customer.update_subscription(:prorate=>true, :plan=>plan)

  end



    if plan=="personal"
        #pass a false value to make sure the storage is not cleared to zero
        current_user.personal_init(false)
    elsif plan=="premium"
        current_user.premium_init(false)
    end
    
    

  
    if current_user.save
        Notifier.send_invoice(current_user).deliver
        respond_to do |format|
          format.html{@plan=plan.capitalize}
        end 
    else
        respond_to do |format|
          format.html{@plan=plan.capitalize}
        end 
    end

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


  def confirm

    @user=User.find_by_confirmation_code!(params[:id])
      
      if @user
        @user.confirmed = true
        @user.save
        cookies[:auth_token] = @user.auth_token
        redirect_to '/new_transfer', :notice=>"Welcome! Your account has been activated"
      else
        redirct_to '/new_transfer', :notice=>"Something goes wrong"
      end

  end
    





end
