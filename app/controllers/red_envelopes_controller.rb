class RedEnvelopesController < ApplicationController
  
  # During the Chinese new year, Tangtang can claim red envelope here everyday
  # Game rules: 
  #   -- Each red envelope has max value of 50. 
  #   -- Each claim will get a random value between 1 and the max value
  #   -- Tangtang has the chance to claim once per day
  #   -- Game ends when I return and I will give Tangtang the total amount she claims
	def index 
	end
end
