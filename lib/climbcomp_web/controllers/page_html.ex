defmodule ClimbcompWeb.PageHTML do
  use ClimbcompWeb, :html

  alias Climbcomp.Result
  alias Climbcomp.Problem

  embed_templates "page_html/*"

  defp results_for_problem(results, problem_id) do
    Enum.filter(results, &(&1.problem_id == problem_id))
  end

  defp topped_problem?(%Result{points: points}, %Problem{toppoints: toppoints}) do
    points == toppoints
  end
end
