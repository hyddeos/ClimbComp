defmodule Climbcomp.Results do
  import Ecto.Query
  require Logger

  alias Climbcomp.Competitions
  alias Climbcomp.Competition
  alias Climbcomp.Result
  alias Climbcomp.Repo
  alias Climbcomp.Problem
  alias Climbcomp.Problems

  def save_result(params) do
    %Result{}
    |> Result.changeset(params)
    |> Repo.insert()
  end

  def get_next_competitor_data(result_params) do
    competitors = Competitions.get_competitors(result_params["competition_id"])
    total_problems = Problems.count_problems_in_challenge(result_params["challenge_id"])

    results =
      Repo.all(from(r in Result, where: r.competition_id == ^result_params["competition_id"]))

    case results do
      # Competition start, first competitor, Later add live status
      [] ->
        %{
          competitor: List.first(competitors),
          problem_nr: 1
        }

      _ ->
        problem_nr = div(length(results), length(competitors))

        Logger.info("Total Problems: #{total_problems} Competitors: #{competitors}
          results: #{length(results)} , nr comp: #{length(competitors)}
          problmenr: #{problem_nr}
          ")
    end
  end
end
