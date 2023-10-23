defmodule ClimbcompWeb.ResultController do
  use ClimbcompWeb, :controller
  require Logger

  alias Climbcomp.Competitions
  alias Climbcomp.Result
  alias Climbcomp.Results

  def index(conn, %{"id" => id}) do
    results =
      case Results.load_competition(id) do
        {:ok, results} -> results
        results -> results
      end

    conn
    |> put_status(200)
    |> json(results)
  end

  def create(conn, %{"result" => result_params}) do
    case Results.save_result(result_params) do
      {:ok, %Result{} = _result} ->
        case result_params["last_result"] do
          true ->
            Competitions.set_competition_as_completed(result_params["competition_id"])

            send_resp(conn, :no_content, "")

          false ->
            next_competitor_data = Results.get_next_competitor_data(result_params)

            conn
            |> put_status(:created)
            |> json(next_competitor_data)
        end

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
