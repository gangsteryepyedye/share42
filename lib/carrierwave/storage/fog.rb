CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',       # required
    :aws_access_key_id      => 'AKIAICDXU5SXRWQA5RQA',       # required
    :aws_secret_access_key  => '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',       # required
  }
  config.fog_directory  = 'filetunnel'                     # required
end