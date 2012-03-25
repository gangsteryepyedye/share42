Dir["#{Rails.root}/app/workers/*.rb"].each { |file| require file }
Resque.redis = Redis.connect(:url =>'redis://redistogo:72d608637652eb4bbd799ef5bf10327f@pike.redistogo.com:9325')
Resque.after_fork = Proc.new { ActiveRecord::Base.establish_connection }