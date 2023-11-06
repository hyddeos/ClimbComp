defmodule ClimbcompWeb.PageController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competitions
  alias Climbcomp.Results

  def home(conn, _params) do
    competitions_live = Competitions.list_live_competitions()
    competitions_completed = Competitions.list_completed_competitions()

    render(conn, :home,
      competitions_live: competitions_live,
      competitions_completed: competitions_completed
    )
  end

  def show(conn, %{"id" => competition_id}) do
    competition =
      Competitions.get_competition!(competition_id,
        preload: [:result, challenge: :problems]
      )

    scoreboard = Results.get_sorted_scoreboard(competition)

    render(conn, :show, competition: competition, scoreboard: scoreboard)
  end
end
