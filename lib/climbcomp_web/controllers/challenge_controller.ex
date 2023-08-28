defmodule ClimbcompWeb.ChallengeController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Challenge
  alias Climbcomp.Challenges
  alias Climbcomp.Repo

  def index(conn, _params) do
    challenges = Challenges.list_challanges()
    json(conn, build_challenges_json(challenges))
  end

  def create(conn, %{"challenge" => challenge_params}) do
    IO.inspect(challenge_params, label: "INSPECT")

    case Challenges.create_challenge(challenge_params) do
      {:ok, %Challenge{} = challenge} ->
        inserted_challenge_with_problems = Repo.preload(challenge, :problems)

        conn
        |> put_status(:created)
        |> json(build_challenge_json(inserted_challenge_with_problems))

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

  defp build_challenges_json(challanges) when is_list(challanges) do
    for challenge <- challanges do
      build_challenge_json(challenge)
    end
  end

  defp build_challenge_json(challenge) do
    %{
      id: challenge.id,
      name: challenge.name,
      problems: Enum.map(challenge.problems, fn problem -> build_problem_json(problem) end)
    }
  end

  defp build_problem_json([]), do: []

  defp build_problem_json(problem) do
    %{
      name: problem.name,
      position: problem.position,
      type: problem.type,
      grade: problem.grade,
      timelimit: problem.timelimit,
      zonepoints: problem.zonepoints,
      toppoints: problem.toppoints
    }
  end
end
