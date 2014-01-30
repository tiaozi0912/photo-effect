#!/bin/env ruby
# encoding: utf-8

class RedEnvelopesController < ApplicationController
  # During the Chinese new year, Tangtang can claim red envelope here everyday
  # Game rules: 
  #   -- Each red envelope has max value of 50. 
  #   -- Each claim will get a random value between 1 and the max value
  #   -- Tangtang has the chance to claim once per day
  #   -- Game ends when I return and I will give Tangtang the total amount she claims
	def index
		@body_class = "red-envelopes"
		@title = "抢红包"
		respond_to do |format|
			format.html {
				render "index"
			}

			format.json {
        @re = RedEnvelope.all.map {|en| en.to_json}

        @total = 0.00
        RedEnvelope.all.each {|en| @total += en.amount}

        render :json => {
        	:red_envelopes => @re,
        	:total => @total
        }
			}
		end
	end

	def create
    @en = RedEnvelope.create(params[:red_envelope])
    render :json => {
    	:red_envelope => @en.to_json
    }
	end

end
