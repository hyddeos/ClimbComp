defmodule Climbcomp.Competitions do
  import Ecto.Query

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

  def get_challenge_id_for_competition(competition_id) do
    from(c in Climbcomp.Competition,
      where: c.id == ^competition_id,
      select: c.challenge_id
    )
    |> Repo.one()
  end

  def get_competition_title(competition_id) do
    competition = Repo.get(Competition, competition_id)

    case competition do
      %Climbcomp.Competition{name: name} ->
        name

      _ ->
        IO.puts("No competitors found")
    end
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
