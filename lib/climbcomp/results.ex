defmodule Climbcomp.Results do
  import Ecto.Query
  require Logger

  alias Climbcomp.Competition
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
    compeition =
      Competitions.get_compeition!(competition_id,
        preload: [:result, challenge: :problems]
      )

    case compeition.result do
      # Start the competition if no results if found
      [] ->
        problem_data = get_current_problem(compeition.challenge.problems)

        results = %{
          completed: compeition.completed,
          competition_title: compeition.name,
          competition_id: competition_id,
          challenge_id: compeition.challenge_id,
          competitor: List.first(compeition.competitors),
          problem_nr: 1,
          problem_data: problem_data,
          total_problems: length(compeition.challenge.problems),
          scoreboard: get_scoreboard(compeition.competitors, compeition.result)
        }

        {:ok, results}

      # Load data from an already started competition
      _ ->
        problem_nr = div(length(compeition.result), length(compeition.competitors)) + 1
        problem_data = get_current_problem(compeition.challenge.problems, problem_nr)

        results = %{
          completed: compeition.completed,
          competition_title: compeition.name,
          competition_id: compeition.id,
          challenge_id: compeition.challenge_id,
          competitor:
            who_is_next_competitor(compeition.competitors, List.first(compeition.result)),
          problem_nr: problem_nr,
          problem_data: problem_data,
          total_problems: length(compeition.challenge.problems),
          scoreboard: get_scoreboard(compeition.competitors, compeition.result)
        }

        {:ok, results}
    end
  end

  def get_next_competitor_data(result_params) do
    compeition =
      Competitions.get_compeition!(result_params["competition_id"],
        preload: [:result, challenge: :problems]
      )

    problem_nr = div(length(compeition.result), length(compeition.competitors)) + 1
    problem_data = get_current_problem(compeition.challenge.problems, problem_nr)

    %{
      completed: compeition.completed,
      competition_title: compeition.name,
      competition_id: compeition.id,
      challenge_id: compeition.challenge_id,
      competitor: who_is_next_competitor(compeition.competitors, List.first(compeition.result)),
      problem_nr: problem_nr,
      problem_data: problem_data,
      total_problems: length(compeition.challenge.problems),
      scoreboard: get_scoreboard(compeition.competitors, compeition.result)
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
    # when there is no previous results
    List.last(problems)
    |> build_problem_json()
  end

  defp get_current_problem(problems, problem_nr) do
    # when there is previous results
    case Enum.at(problems, problem_nr - 1) do
      problem = %Climbcomp.Problem{} ->
        result = build_problem_json(problem)
        result

      nil ->
        build_problem_json()
        # Loads problem for when the competition is over
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

        %{competitor: competitor, score: score, attempts: attempts, problems: problems_done}
    end
  end

  defp who_is_next_competitor(competitors, last_result) do
    last_competitor = Map.get(last_result, :competitor)

    index_of_last_competitor =
      Enum.find_index(competitors, fn comp -> comp == last_competitor end)

    if index_of_last_competitor == length(competitors) - 1 do
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

  defp build_problem_json() do
    %{
      "id" => 0,
      "name" => "competition over",
      "position" => "competition over",
      "grade" => "competition over",
      "timelimit" => 0,
      "toppoints" => 0,
      "zonepoints" => 0,
      "type" => "competition over"
    }
  end
end
