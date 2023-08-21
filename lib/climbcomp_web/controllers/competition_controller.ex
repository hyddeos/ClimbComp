defmodule ClimbcompWeb.CompetitionController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competition
  alias Climbcomp.Competitions
  alias Climbcomp.Repo

  def index(conn, _params) do
    competitions = Competitions.list_competitions()
    json(conn, build_competitions_json(competitions))
  end

  def create(conn, %{"competition" => competitions_params}) do
    case Competitions.create_competition(competitions_params) do
      {:ok, %Competition{} = competition} ->
        conn
        |> put_status(:created)
        |> json(build_competition_json(competition))

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: translate_errors(changeset)})
    end
  end

  defp build_competitions_json(competitions) do
    for competition <- competitions do
      build_competition_json(competition)
    end
  end

  defp build_competition_json(competition) do
    IO.inspect(competition, label: "build_comp")

    %{
      name: competition.name,
      challenge_id: competition.challenge_id,
      competitors: competition.competitors
    }
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r"%{(\w+)}", message, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end
