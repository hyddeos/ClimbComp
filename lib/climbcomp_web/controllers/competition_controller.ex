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
    IO.inspect(competitions_params, label: "INSPECT PARAMS")

    clean_params = clean_up_params(competitions_params)
    IO.inspect(clean_params, label: "INSPECT PARAMS3")

    case Competitions.create_competition(clean_params) do
      {:ok, %Competition{} = competition} ->
        conn
        |> put_status(:created)
        |> json(build_competition_json(competition))

      {:error, changeset} ->
        IO.puts("--In Error--")

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
      challenge: competition.id,
      competitors: Enum.map(competition.competitors, fn competitor -> competitor.name end)
    }
  end

  def clean_up_params(params) do
    params_with_int_challenge =
      Map.update!(params, "challenge", &String.to_integer/1)

    params_with_names =
      params_with_int_challenge
      |> Map.update!("competitors", fn competitors ->
        Enum.map(competitors, fn competitor -> competitor["name"] end)
      end)

    params_with_names
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r"%{(\w+)}", message, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end
