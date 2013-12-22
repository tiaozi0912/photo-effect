S3_PRO_BUCKET="halface-production"
S3_DEV_BUCKET="halface-dev"

S3_KEY="AKIAJ63PKKTN3NGF5U6A"
S3_SECRET="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"
	
if Rails.env.production?
	bucket = S3_PRO_BUCKET
else
	bucket = S3_DEV_BUCKET
end

S3_CREDENTIALS = {
  :access_key_id => S3_KEY,
  :secret_access_key => S3_SECRET,
  :bucket => bucket
}
