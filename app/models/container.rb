class Container < ActiveRecord::Base
  has_many :stuffs, :dependent => :destroy
  has_many :emails, :dependent => :destroy
  belongs_to :user

  require 'rubygems'
  require 'sitemap_generator'

  def self.generate_sitemap

    SitemapGenerator::Sitemap.default_host = 'http://www.42share.com'
    SitemapGenerator::Sitemap.create do

      add '/', :changefreq => 'weekly'
      add '/pages/contact_us', :changefreq => 'weekly'
      add '/pages/pricing', :changefreq => 'weekly'
      for c in Container.where("fake=?",true)
        string='/containers/'+c.sha1
        add string
      end

    end
    SitemapGenerator::Sitemap.ping_search_engines # called for you when you use the rake task
  end

  def self.get_link()
    Resque.enqueue(Getlink)
  end

  module Getlink

    @queue=:crawl_queue

    def self.perform()
      7016247.downto(7016246){|i|
        file={}
        url="http://thepiratebay.se/torrent/#{i}"

        begin
          doc = open(url) { |f| Hpricot(f) }
        rescue
          next
        end


        file_name = (doc/"#title").inner_html
        file[:name] = file_name.gsub("\n","").gsub("\t","")
        file_size = 6144+rand(10240)
        file[:size] = file_size
        file_link = (doc/"a[@title=Torrent File]").first
        if file_link.nil?
          next
        else
          file_link = file_link.attributes['href']
        end
        file[:link]=file_link
        @container=Container.new
        @container.save
        sha1=Digest::SHA1.hexdigest([@container.id.to_s,rand].join)
        @container.sha1 = sha1.to_s
        @container.name = file[:name]
        @container.fake = true
        @container.is_single = true
        @container.save
        @stuff = @container.stuffs.new
        @stuff.file_file_name=file[:name]
        @stuff.file_file_size=file[:size]
        @stuff.fake_link=file[:link]
        @stuff.save

      }
    end
  end

  def self.shorten(url)
    client = Googl.client('harrison@42zenlab.com', 'cmfttlpqf4')
    return client.shorten(url)
  end

  def expire
    self.destroy
  end

  def self.find_by_id_or_sha1(id)
    Container.find_by_sha1(id)
  end

  def to_param
    sha1
  end

  def remove(user_id)
    @container=self
    zip_name = @container.stuffs.first.file_file_name.to_s+".zip"
    if user_id!=-1
      @user=User.find(user_id)
      for stuff in @container.stuffs
        if !stuff.nil?
          @user.storage = @user.storage-stuff.file_file_size
          stuff.destroy
        end
      end
      @user.save
    end

    @container.exptime = Time.zone.now
    @container.state = "removed"
    @container.save

    if (@container.is_single!=true)&&(@container.zipped==true)
      #destroy zip
      s3 = AWS::S3.new(:access_key_id => 'AKIAICDXU5SXRWQA5RQA',:secret_access_key => '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')
      bucket = s3.buckets['filetunnel']
      filename="zip/#{@container.sha1}/#{zip_name}"
      s3obj = bucket.objects[filename]
      s3obj.delete()
    end

    if (@container.is_single!=true)&&(@container.zipped==false)
      Spacecop.add_clean_later(@container.sha1)
    end
  end

  def self.test_remove
    for container in Container.all
      if((Time.zone.now-container.updated_at)/3600/48>15)
        if container.user_id.nil?
          if container.empty?
            container.destroy
          else
            container.remove(-1)
          end
        else
          priviledge = User.find(container.user_id).priviledge
          if priviledge == "1"
            container.remove(container.user_id)
          end
        end
      end
    end
  end
end
