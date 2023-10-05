defmodule ClimbcompWeb.ResultController do
  use ClimbcompWeb, :controller
  require Logger

  alias Climbcomp.Result
  alias Climbcomp.Results

  def index(conn, %{"id" => id}) do
    results = Results.load_competition(id)
    IO.inspect(results, label: "Results To Return Back To Json")

    conn
    |> put_status(200)
    |> json(results)
  end

  def create(conn, %{"result" => result_params}) do
    competition_id = result_params["competition_id"]

    case Results.save_result(result_params) do
      {:ok, %Result{} = _result} ->
        next_competitor_data = Results.get_next_competitor_data(result_params)

        conn
        |> put_status(:created)
        |> json(next_competitor_data)

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
