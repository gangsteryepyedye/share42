require 'resque/tasks'


require 'resque_scheduler/tasks'    

task "resque:setup" => :environment
task "resque:scheduler_setup" => :environment



task "resque:setup" => :environment do
  Resque.redis = Redis.connect('redis://redistogo:72d608637652eb4bbd799ef5bf10327f@pike.redistogo.com:9325')
  ENV['QUEUE'] = '*'
end
 
desc "Alias for resque:work (To run workers on Heroku)"
task "jobs:work" => "resque:work"

