class GenesController < ApplicationController

  def index
    respond_to do |format|
      format.json { render json: makeGene, :methods => [:chromosomes] }
    end
  end

  protected

  # For now this can just hand back a fully populated test gene
  # TODO: This should look for an unused gene or breed some more
  def makeGene
  	newGene = Gene.create!(:guid => 'asdf', :status => 0)

    # while(!newGene.complete?) do
    #   #binding.pry
    #   c = newGene.chromosomes.build().save!
    # end
    # #binding.pry
    # newGene

    newGene.chromosomes.build(:d1 => 'h', :d2 => 'n', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'h', :d2 => 'c', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'h', :d2 => 'a', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'h', :d2 => 'v', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'h', :d2 => 'm', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'h', :d2 => 's', :proportion => 2000, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'n', :d2 => 'c', :proportion => 10, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'n', :d2 => 'a', :proportion => 10, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'n', :d2 => 'v', :proportion => 10, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'n', :d2 => 'm', :proportion => 10, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'n', :d2 => 's', :proportion => 10, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'c', :d2 => 'a', :proportion => 2.5, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'c', :d2 => 'v', :proportion => 2.5, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'c', :d2 => 'm', :proportion => 2.5, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'c', :d2 => 's', :proportion => 2.5, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'a', :d2 => 'v', :proportion => 400, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'a', :d2 => 'm', :proportion => 400, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'a', :d2 => 's', :proportion => 400, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'v', :d2 => 'm', :proportion => 0.1, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'v', :d2 => 's', :proportion => 0.1, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'm', :d2 => 's', :proportion => 30, :weight => 1)
  	newGene.chromosomes.build(:d1 => 's', :d2 => 'r', :proportion => 1, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'r', :d2 => 'g', :proportion => 1, :weight => 1)
  	newGene.chromosomes.build(:d1 => 'g', :d2 => 'b', :proportion => 1, :weight => 1)

    newGene
  end

end