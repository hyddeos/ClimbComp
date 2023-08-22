defmodule Climbcomp.Results do
  alias ClimbcompWeb.Competition
  alias Climbcomp.Repo

  def current_state(competition_id) do
    Repo.get(Competition, competition_id)
  end
end
