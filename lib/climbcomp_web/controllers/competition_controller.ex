defmodule ClimbcompWeb.CompetitionController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competition
  alias Climbcomp.Competitions
  alias Climbcomp.Repo

  def create(conn, %{"competition" => competitions_params}) do
    IO.inspect(competitions_params, label: "INSPECT PARAMS")

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

  defp build_competition_json(competition) do
    %{
      name: competition.name,
      challenge: competition.id,
      competitors: Enum.map(competition.competitors, fn competitor -> competitor.name end)
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
