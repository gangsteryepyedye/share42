Resque::Server.use(Rack::Auth::Basic) do |user, password|
  password == "cmfttlpqf4"
end