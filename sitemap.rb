require 'rubygems'
require 'sitemap_generator'

SitemapGenerator::Sitemap.default_host = 'http://www.42share.com'
SitemapGenerator::Sitemap.create do
  add '/', :changefreq => 'weekly'
  add '/pages/contact_us', :changefreq => 'weekly'
  add '/pages/pricing', :changefreq => 'weekly'
end
SitemapGenerator::Sitemap.ping_search_engines # called for you when you use the rake task