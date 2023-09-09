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
    # Called when a GET request is called from the Competition by ID
    competitors = Competitions.get_competitors(competition_id)

    total_problems =
      Competitions.get_challenge_id_for_competition(competition_id)
      |> Problems.count_problems_in_challenge()

    results =
      Repo.all(
        from(r in Result,
          where: r.competition_id == ^competition_id,
          order_by: [desc: r.inserted_at]
        )
      )

    case results do
      # Start the competition if no results if found
      [] ->
        %{
          competitor: List.first(competitors),
          problem_nr: 1,
          total_problems: total_problems,
          scoreboard: get_scoreboard(competitors, results)
        }

      # Load data from an already started competition
      _ ->
        problem_nr = div(length(results), length(competitors)) + 1

        %{
          competitor: who_is_next_competitor(competitors, List.first(results)),
          problem_nr: problem_nr,
          total_problems: total_problems,
          scoreboard: get_scoreboard(competitors, results)
        }
    end
  end

  def get_next_competitor_data(result_params) do
    # Called when a POST has been made with new results, this fetches the data for the next competitor
    competitors = Competitions.get_competitors(result_params["competition_id"])
    total_problems = Problems.count_problems_in_challenge(result_params["challenge_id"])

    results =
      Repo.all(from(r in Result, where: r.competition_id == ^result_params["competition_id"]))

    problem_nr = div(length(results), length(competitors)) + 1

    %{
      competitor: who_is_next_competitor(competitors, List.first(results)),
      problem_nr: problem_nr,
      total_problems: total_problems,
      scoreboard: get_scoreboard(competitors, results)
    }

    Logger.info("Total Problems: #{total_problems} Competitors: #{competitors}
      results: #{length(results)} , nr comp: #{length(competitors)}
      problmenr: #{problem_nr + 1}
      ")
  end

  defp get_scoreboard(competitors, results) do
    %{
      competitors_scores: get_competitors_scores(competitors, results)
    }
  end

  defp get_competitors_scores(competitors, results) do
    Enum.map(competitors, fn competitor -> count_competitor_score(competitor, results) end)
  end

  defp count_competitor_score(competitor, results) do
    case results do
      [] ->
        %{competitor: competitor, score: 0, problems: 0}

      _ ->
        problems_done =
          Enum.count(results, fn result ->
            result.competitor == competitor
          end)

        score =
          Enum.reduce(results, 0.0, fn result, accumulator ->
            if result.competitor == competitor do
              accumulator + result.points
            else
              accumulator
            end
          end)

        %{competitor: competitor, score: score, problmes: problems_done}
    end
  end

  defp who_is_next_competitor(competitors, last_result) do
    last_competitor = Map.get(last_result, :competitor)

    index_of_last_competitor =
      Enum.find_index(competitors, fn comp -> comp == last_competitor end)

    if index_of_last_competitor == length(competitors) do
      List.first(competitors)
    else
      Enum.at(competitors, index_of_last_competitor + 1)
    end
  end
end
