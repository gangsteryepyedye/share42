class SessionsController < ApplicationController
    
    def new           
    end

    def create
      user = User.authenticate(params[:email], params[:password])
      if user
        session[:user_id] = user.id
        redirect_to root_url, :notice => "Logged in!"
      else
         flash.now[:error] = "Invalid email/password combination."
         render "new"
      end
    end

    def destroy
      session[:user_id] = nil
      redirect_to root_url, :notice => "Logged out!"
    end

end
