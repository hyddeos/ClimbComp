defmodule Climbcomp.Competitions do
  import Ecto.Query

  require Logger
  alias Climbcomp.Competition
  alias Climbcomp.Repo

  def subscribe(%Competition{} = competition) do
    Phoenix.PubSub.subscribe(Climbcomp.PubSub, topic(competition))
  end

  def broadcast(%Competition{} = competition, event) do
    Phoenix.PubSub.broadcast(Climbcomp.PubSub, topic(competition), event)
  end

  defp topic(%Competition{id: competition_id}), do: "competition:#{competition_id}"

  def create_competition(params) do
    %Competition{}
    |> Competition.changeset(params)
    |> Repo.insert()
  end

  def list_competitions do
    competitions =
      Competition
      |> Repo.all()

    Enum.reverse(competitions)
  end

  def list_live_competitions do
    competitions =
      from(c in Competition, where: c.completed == false)
      |> Repo.all()

    Enum.reverse(competitions)
  end

  def list_completed_competitions do
    competitions =
      from(c in Competition, where: c.completed == true)
      |> Repo.all()

    Enum.reverse(competitions)
  end

  def set_competition_as_completed(competition_id) do
    Repo.get(Competition, competition_id)
    |> Ecto.Changeset.change(%{completed: true})
    |> Repo.update()
  end

  def check_completed_status(competition_id) do
    competition = Repo.get(Competition, competition_id)
    competition.completed
  end

  def get_challenge_id_for_competition(competition_id) do
    competition = Repo.get(Competition, competition_id)
    competition.challenge_id
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

  def get_competition!(competition_id, options \\ []) do
    Competition
    |> Repo.get!(competition_id)
    |> Repo.preload(Keyword.get(options, :preload, []))
  end

  def delete_competition(%Competition{} = competition) do
    Repo.delete(competition)
  end
end
