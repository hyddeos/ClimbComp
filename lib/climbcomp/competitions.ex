defmodule Climbcomp.Competitions do
  alias Climbcomp.Competition
  alias Climbcomp.Repo

  def create_competition(params) do
    %Competition{}
    |> Competition.changeset(params)
    |> Repo.insert()
  end

  def list_competitions do
    Competition
    |> Repo.all()
  end
end
