Dir["#{Rails.root}/app/workers/*.rb"].each { |file| require file }
Resque.after_fork = Proc.new { ActiveRecord::Base.establish_connection }