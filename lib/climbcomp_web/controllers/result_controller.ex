defmodule ClimbcompWeb.ResultController do
  use ClimbcompWeb, :controller
  require Logger

  alias Climbcomp.Result
  alias Climbcomp.Results

  def index(conn, %{"id" => id}) do
    results = Results.get_current_state(id)
    IO.puts("Res Controller " <> id <> results)
    Logger.info("--------Inside The Index", id)

    conn
  end

  def create(conn, %{"result" => result_params}) do
    case Results.save_result(result_params) do
      {:ok, %Result{} = _result} ->
        # result = Climbcomp.Repo.preload(result, [:competition, :challenge, :problem])

        conn
        |> send_resp(:created, "")

      # |> put_status(:created)
      # |> json(build_result_json(result))

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
