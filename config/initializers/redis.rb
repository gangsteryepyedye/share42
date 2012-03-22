uri = URI.parse(ENV["REDISTOGO_URL"])
$redis = Redis.new(uri)