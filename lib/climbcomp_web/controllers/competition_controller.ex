defmodule ClimbcompWeb.CompetitionController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competition
  alias Climbcomp.Competitions

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

  def delete(conn, %{"id" => id}) do
    competition = Competitions.get_competition!(id)

    case Competitions.delete_competition(competition) do
      {:ok, _deleted_competition} ->
        # Return a 204 No Content status
        send_resp(conn, :no_content, "")

      {:error, _reason} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render("error.json", error: "Failed to delete challenge")
    end
  end

  def connect(_conn, _token, _params), do: :error

  defp build_competitions_json(competitions) do
    for competition <- competitions do
      build_competition_json(competition)
    end
  end

  defp build_competition_json(competition) do
    %{
      name: competition.name,
      id: competition.id,
      challenge_id: competition.challenge_id,
      competitors: competition.competitors,
      completed: competition.completed
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
