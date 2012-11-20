class Chromosome < ActiveRecord::Base
  belongs_to :gene
  attr_accessible :d1, :d2, :proportion, :weight
end
