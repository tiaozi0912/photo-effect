#!/usr/bin/env ruby

require 'rmagick'
include Magick

class PhotosController < ApplicationController
	def home
    @image_list = ImageList.new("#{images_root}/test/image1.jpg", "#{images_root}/test/image2.jpg")
    @image = @image_list.append(false)
    #@image.display()
    #@image.write("#{images_root}/test/composed_image.jpg")
	end

	def create
		flash['alert-success'] = 'post'
		redirect_to :back
	end
end
