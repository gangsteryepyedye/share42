require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end


  # Standard Testing Procedure  
  # 1. Registraion
  # => User should be able to: 
  # => A.Sign up for a free account => Provide important information such as real name, email and password 
  #  	=> Be redirected to the show page while being given 1GB of free space, 30 downloads per file quota and 150MB per upload limit  
  # => B.Sign up for a Personal/Premium/Plus account => Provide important information such as real name, email and password along with Customer's credit card number
  # 	=> Be redirected to the show page while being given 5/10/100 GB of free space, 100/Unlimited/Unlimited downloads per file quota and 2GB per upload limit 
  # For this section, tests should be focusing on the display of user's priviledge and error messages when user uses up its available resources.
  # 2. Credit Card Processing
  # When given an invalid credit card, the browser should be able to detect it beforehand(before the number is sent to the server) and return 
  # an error message(using topbar). All the related fields will be cleared and are ready for customer's new i
  																																																																																																			nputs.
  # When given a valid credit card number, the browser will instantly ship it off to the backend along with a sttipe token that indicates the authenticity of the credit
  # card information. The backend will update user's priviledge based on the incoming params. Need to notice in javascript file we have created two different functions 
  # to handle two types of payments, upgrading and downgrading, each type of payment should be tested independently.
  # 3. Uploading
  # A. File sender's email address: While for anonymous users, this setting might be inconvinient for the concern of potential spamming. This design could be effective in reducing
  # the number of free riders and increasing the convertion rate. This email address will be 
  # B. File sender's recipients: Recipients have to be valid email addresses, for now we will adjust the height of input area to a maximum of 9 email addresses. 
  # 
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #
  #










end
