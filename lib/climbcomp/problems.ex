defmodule Climbcomp.Problems do
  import Ecto.Query
  require Logger
  alias Climbcomp.Problem
  alias Climbcomp.Repo
  alias Climbcomp.Competitions

  def get_all_problems_in_challenge(competition_id) do
    challenge_id = Competitions.get_challenge_id_for_competition(competition_id)
    Repo.all(from(p in Problem, where: p.challenge_id == ^challenge_id))
  end
end
