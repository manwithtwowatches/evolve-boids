class Chromosome < ActiveRecord::Base
  belongs_to :gene
  attr_accessible :d1, :d2, :proportion, :weight

  # Possible desires are:
  # h, n, c, a, v, m, s, r, g, b
  @@possible_desires = ['h', 'n', 'c', 'a', 'v', 'm', 's', 'r', 'g', 'b']

  # Possible proportions are 1..2000
  # Leaving weights to 1 for the time being

  def initialize(*args)
  	super *args

  	self.d1 = @@possible_desires[rand(@@possible_desires.length)]
  	self.d2 = @@possible_desires[rand(@@possible_desires.length)]
  	self.proportion = rand(2000)
  	self.weight = 1
  end

  def involves_desire(d)
    return self.d1 == d || self.d2 == d
  end

end
