defmodule Climbcomp.Problems do
  import Ecto.Query
  require Logger
  alias Climbcomp.Problem
  alias Climbcomp.Repo

  def count_problems_in_challenge(challenge_id) do
    problems = Repo.all(from(p in Problem, where: p.challenge_id == ^challenge_id))
    Enum.count(problems)
  end
end
