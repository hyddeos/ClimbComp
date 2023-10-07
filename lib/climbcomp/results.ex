defmodule Climbcomp.Results do
  import Ecto.Query
  require Logger

  alias Climbcomp.Competitions
  alias Climbcomp.Result
  alias Climbcomp.Repo
  alias Climbcomp.Problems

  def save_result(params) do
    %Result{}
    |> Result.changeset(params)
    |> Repo.insert()
  end

  def load_competition(competition_id) do
    # Called when a GET request is called from the Competition by ID
    competition_title = Competitions.get_competition_title(competition_id)
    competitors = Competitions.get_competitors(competition_id)
    challenge_id = Competitions.get_challenge_id_for_competition(competition_id)
    problems = Problems.get_all_problems_in_challenge(competition_id)
    IO.inspect(problems, label: "inside load comp")
    results = get_results(competition_id)

    case results do
      # Start the competition if no results if found
      [] ->
        problem_data = get_current_problem(problems)

        %{
          competition_title: competition_title,
          competition_id: competition_id,
          challenge_id: challenge_id,
          competitor: List.first(competitors),
          problem_nr: 1,
          problem_data: problem_data,
          total_problems: length(problems),
          scoreboard: get_scoreboard(competitors, results)
        }

      # Load data from an already started competition
      _ ->
        problem_nr = div(length(results), length(competitors)) + 1
        problem_data = get_current_problem(problems, problem_nr)

        %{
          competition_title: competition_title,
          competition_id: competition_id,
          challenge_id: challenge_id,
          competitor: who_is_next_competitor(competitors, List.first(results)),
          problem_nr: problem_nr,
          problem_data: problem_data,
          total_problems: length(problems),
          scoreboard: get_scoreboard(competitors, results)
        }
    end
  end

  def get_next_competitor_data(result_params) do
    # Called when a POST has been made with new results, this fetches the data for the next competitor
    competition_title = Competitions.get_competition_title(result_params["competition_id"])
    competitors = Competitions.get_competitors(result_params["competition_id"])
    challenge_id = Competitions.get_challenge_id_for_competition(result_params["competition_id"])
    problems = Problems.get_all_problems_in_challenge(result_params["competition_id"])
    IO.inspect(problems, label: "inside NEXt comp")
    results = get_results(result_params["competition_id"])

    problem_nr = div(length(results), length(competitors)) + 1

    problem_data = get_current_problem(problems, problem_nr)

    %{
      competition_title: competition_title,
      competition_id: result_params["competition_id"],
      challenge_id: challenge_id,
      competitor: who_is_next_competitor(competitors, List.first(results)),
      problem_nr: problem_nr,
      problem_data: problem_data,
      total_problems: length(problems),
      scoreboard: get_scoreboard(competitors, results)
    }
  end

  defp get_results(competition_id) do
    Repo.all(
      from(r in Result,
        where: r.competition_id == ^competition_id,
        order_by: [desc: r.inserted_at]
      )
    )
  end

  defp get_current_problem(problems) do
    List.last(problems)
    |> build_problem_json()
  end

  defp get_current_problem(problems, problem_nr) do
    case Enum.at(problems, problem_nr - 1) do
      {:ok, problem} ->
        problem
        |> build_problem_json()

      nil ->
        {:error, "Problem not found"}
    end
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
        %{competitor: competitor, score: 0, problems: 0, attempts: 0}

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

        attempts =
          Enum.reduce(results, 0.0, fn result, accumulator ->
            if result.competitor == competitor do
              accumulator + result.attempts
            else
              accumulator
            end
          end)

        %{competitor: competitor, score: score, attempts: attempts, problmes: problems_done}
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

  defp build_problem_json(problem) do
    %{
      "id" => problem.id,
      "name" => problem.name,
      "position" => problem.position,
      "grade" => problem.grade,
      "timelimit" => problem.timelimit,
      "toppoints" => problem.toppoints,
      "zonepoints" => problem.zonepoints,
      "type" => problem.type
    }
  end
end
