class RedEnvelope < ActiveRecord::Base
  attr_accessible :amount, :user_id

  default_scope :order => "created_at DESC"

  def to_json
  	{
  		:amount => amount,
  		:created_at => created_at.to_time.to_i
  	}
  end

end
