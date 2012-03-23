require 'resque/tasks'


require 'resque_scheduler/tasks'    

task "resque:setup" => :environment
task "resque:scheduler_setup" => :environment



task "resque:setup" => :environment do
  ENV['QUEUE'] = '*'
end
 
desc "Alias for resque:work (To run workers on Heroku)"
task "jobs:work" => "resque:work"




namespace :resque do
  task :setup do
    require 'resque'
    require 'resque_scheduler'
    require 'resque/scheduler'      
 
  end
end