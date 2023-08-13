defmodule ClimbcompWeb.Competition do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competition
  alias Climbcomp.Challenge
  alias Climbcomp.Repo

  def create(conn, %{"competition" => competitions_params}) do
    IO.inspect(competitions_params, label: "INSPECT PARAMS")

    case Competiton.create_competition(competitions_params) do
      {:ok, %Competition{} = competition} ->
        conn
        |> put_status(:created)

      # |> json(build_competition_json(competitions))

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: translate_errors(changeset)})
    end
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r"%{(\w+)}", message, fn _, key ->
        opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
      end)
    end)
  end
end
