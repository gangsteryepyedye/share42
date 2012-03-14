class EmailSupportsController < ApplicationController

	def new

	end


	def create
		
		if params[:message]!=nil
			Notifier.plan_support(params[:sender],params[:message]).deliver
		end

		respond_to do |format|
        	@message="Thank you! We have received your message and we will get back to you soon."
        	@type="notice"
        	format.js{
        	  	render :action=>"notice"
        	}
      	end 

	end 


end
