class Gene < ActiveRecord::Base
  has_many :chromosomes

  attr_accessible :guid, :status

  # Check if we have a complete "path" to every desire
  def complete?
  	# An island is an array of chromosomes
  	islands = [[]] # Array of array of chromosomes
  	#!(self.chromosomes.length < 10)
  	self.chromosomes.each do |c|
  	  putOnIsland(islands, c)
  	end

  	return allPathsVisited? islands

  end

  protected

  def putOnIsland(islands, chromosome)
  	added = false
  	# Add to first island which contains a gene with one of the same desires
  	islands.each do |island|
  	  #binding.pry
  	  if islandCanTake island, chromosome
	  	island.push chromosome
	  	added = true
  	  	break
  	  end
  	end

  	if added
  	  # Added so join islands if possible
  	  # binding.pry
  	  islands = joinIslands islands
  	else
  	  # Add to a new island
  	  # binding.pry
  	  newIsland = [].push chromosome
  	  islands.push newIsland
  	end

  	# Return true is all paths can be visited
  	return islands
  end

  def islandCanTake(island, newChrom)
    # Empty island can always take
   	return true if island.empty?

    # Check each chromosome on island to see if it shares a desire with the newcomer
    island.each do |chrom|
      if (chrom.d1 == newChrom.d1) || (chrom.d1 == newChrom.d2) || (chrom.d2 == newChrom.d1) || (chrom.d2 == newChrom.d2)
        return true
      end
    end

    # Nothing in common, return false
    false
  end

  def joinIslands islands
  	#binding.pry
    # See if we can join up islands which share chromes with a common desire
    checking_index1 = islands.length - 1
    checking_index2 = islands.length - 2
    while(islands.length > 1 && checking_index1 >= 0 && checking_index2 >= 0)
      # binding.pry
      island1 = islands[checking_index1]
      island2 = islands[checking_index2]
      island1.each do |c|
        if islandCanTake island2, c
          # Remove and join islands together since they have a link
          island1 = islands.delete_at(checking_index1)
          island2 = islands.delete_at(checking_index2)
          joined = island1.concat island2

          # Push new joined island back onto islands array
          islands.push joined

          # Recurse over new reduced array of islands
          return joinIslands islands
        end
        checking_index2 = checking_index2 - 1
        if checking_index2 < 0
          checking_index1 = checking_index1 - 1
          checking_index2 = checking_index1 - 1
        end
      end
      # No join so
    end

    return islands
  end

  def allPathsVisited?(islands)
  	#binding.pry
    if islands.length == 1
      chroms = islands[0]
      # TODO: Move this to static variable
      possible_desires = ['h', 'n', 'c', 'a', 'v', 'm', 's', 'r', 'g', 'b']

      # Check that each desire is contained in at least one of the chromes
      possible_desires.each do |d|
        is_contained = false
        chroms.each do |c|
          if c.involves_desire d
            is_contained = true
            break
          end
        end
        if !is_contained
          # If this desire isn't contained in any of the genes we can return false immediately
          return false
        end
        # All desires are contained in at least one chrom so we can return true
        return true
      end
    else
      return false
    end
  end

end
