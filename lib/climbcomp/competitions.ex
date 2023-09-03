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

  def get_competitors(competition_id) do
    competition = Repo.get(Competition, competition_id)

    case competition do
      %Climbcomp.Competition{competitors: competitors} ->
        competitors

      _ ->
        IO.puts("No competitors found")
    end
  end
end
