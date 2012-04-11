source 'http://rubygems.org'

gem 'rails', '3.1.1'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

group :development do
	gem 'sqlite3'
	gem 'sqlite3-ruby', :require => 'sqlite3'

end



group :production do
	gem "thin"
	gem 'pg'
end
# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end


gem 'resque-scheduler', require: 'resque_scheduler', git: 'git://github.com/bvandenbos/resque-scheduler'
gem "mail"
gem "aws-ses"
gem 'aws-s3'
gem 'aws-sdk'
gem "paperclip", "~> 2.4"
gem 'jquery-rails'
gem 'rubyzip'
gem "bcrypt-ruby", :require => "bcrypt"
gem "googl"
gem 'stripe', :git => 'https://github.com/stripe/stripe-ruby'
gem 's3_swf_upload', :git => 'git://github.com/nathancolgate/s3-swf-upload-plugin'
gem 'resque', :require => 'resque/server'  
gem 'redis-objects'	
gem 'rspec'
gem "rspec-rails"
gem "autotest"
gem "autotest-rails"
gem "ZenTest", "4.6.0"
gem "eventmachine", "~> 1.0.0.beta.4.1"
gem 'roadie'
gem 'bitly'
gem 'hpricot'
gem 'carrierwave'
gem 'fog'
gem 'sitemap_generator'



# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end
