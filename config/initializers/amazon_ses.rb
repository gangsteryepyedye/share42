require 'aws/ses'

ActionMailer::Base.add_delivery_method :ses, AWS::SES::Base,
  :access_key_id     => ENV['AKIAICDXU5SXRWQA5RQA'],
  :secret_access_key => ENV['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']