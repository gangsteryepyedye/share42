require 'aws/ses'

ActionMailer::Base.add_delivery_method :ses, AWS::SES::Base,
  :access_key_id     => 'AKIAICDXU5SXRWQA5RQA',
  :secret_access_key => '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'