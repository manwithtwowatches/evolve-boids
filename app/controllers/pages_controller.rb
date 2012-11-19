class PagesController < ApplicationController
  def home
  	respond_to do |format|
  		format.html { render }
  	end
  end
end
