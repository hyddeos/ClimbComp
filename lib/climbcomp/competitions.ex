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

  def list_live_competitions do
    from(c in Competition, where: c.completed == false)
    |> Repo.all()
  end

  def list_completed_competitions do
    from(c in Competition, where: c.completed == true)
    |> Repo.all()
  end

  def set_competition_as_completed(competition_id) do
    competition = Repo.get(Competition, competition_id)
    Ecto.Changeset.change(competition, completed: true)
  end

  def check_completed_status(competition_id) do
    competition = Repo.get(Competition, competition_id)

    competition.completed
  end

  def get_challenge_id_for_competition(competition_id) do
    compeition = Repo.get(Competition, competition_id)

    compeition.challenge_id
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

  def get_compeition!(compeition_id, options \\ []) do
    Competition
    |> Repo.get!(compeition_id)
    |> Repo.preload(Keyword.get(options, :preload, []))
  end

  def delete_competition(%Competition{} = competition) do
    Repo.delete(competition)
  end
end
