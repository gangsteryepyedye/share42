

class WwwMiddleware
def initialize(app)
@app = app
end

def call(env)
request = Rack::Request.new(env)
if request.host.starts_with?(“*.com”)
[301, {"Location" => request.url.sub("//*.com", "//www.*.com")}, self]
else
@app.call(env)
end
end

def each(&block)
end
end