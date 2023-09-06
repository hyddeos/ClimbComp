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

  def load_competition(competition_id) do
    competitors = Competitions.get_competitors(competition_id)

    total_problems =
      Competitions.get_challenge_id_for_competition(competition_id)
      |> Problems.count_problems_in_challenge()

    results =
      Repo.all(from(r in Result, where: r.competition_id == ^competition_id))

    case results do
      # Start the competition if no results if found
      [] ->
        %{
          competitor: List.first(competitors),
          problem_nr: 1,
          total_problems: total_problems
        }

      # Load data from an already started competition
      _ ->
        problem_nr = div(length(results), length(competitors))

        %{
          # <--- Fix so it load correct Competitor
          competitor: List.first(competitors),
          problem_nr: problem_nr,
          total_problems: total_problems
        }
    end
  end

  def get_next_competitor_data(result_params) do
    competitors = Competitions.get_competitors(result_params["competition_id"])
    total_problems = Problems.count_problems_in_challenge(result_params["challenge_id"])

    results =
      Repo.all(from(r in Result, where: r.competition_id == ^result_params["competition_id"]))

    problem_nr = div(length(results), length(competitors))

    Logger.info("Total Problems: #{total_problems} Competitors: #{competitors}
      results: #{length(results)} , nr comp: #{length(competitors)}
      problmenr: #{problem_nr}
      ")
  end
end
