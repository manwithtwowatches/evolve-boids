class Gene < ActiveRecord::Base
  has_many :chromosomes

  attr_accessible :guid, :status
end
