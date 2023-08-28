defmodule Climbcomp.Results do
  require Logger

  alias Climbcomp.Competition
  alias Climbcomp.Result
  alias Climbcomp.Repo

  def save_result(params) do
    Logger.info(params)

    %Result{}
    |> Result.changeset(params)
    |> Repo.insert()
  end

  def get_current_state(competition_id) do
    Logger.info("in get_current_state")

    competition_data = Repo.get(Competition, competition_id)

    # get all data and add to dict, status, current problem, total problems, who to go, and scoreboard
    # %{"competition_status" => get_competition_status(competition_id)
    get_competition_status(competition_id)
  end

  defp get_competition_status(competition_id) do
    # return not started, live or over
    Logger.info("In get comp status")
    Logger.info("Repo get #{Repo.get(Result, competition_id)}")

    case Repo.get_by(Result, competition_id: competition_id) do
      nil -> "not_started"
      # separate later live or ended
      _ -> "live or ended"
    end
  end
end
