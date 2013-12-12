class Photo < ActiveRecord::Base
  attr_accessible :title, :user_id, :image

  has_attached_file :image,
                    :styles => { :thumbnail => "25x25#",
                                   :small => "40x40#",
                                   :medium => "125x125#",
                                   :large => "250x250#" },
                    :storage => :s3,
                    :s3_credentials => S3_CREDENTIALS,
                    :url=>"/:id/created_at_:created_at/:style.jpg",
                    :path => '/app/public/photos:url'

  validates_attachment :avatar, :presence => true, :size => { :in => 0..1000.kilobytes }

  Paperclip.interpolates :created_at do |attachment, style|
    attachment.instance.created_at
  end
end
