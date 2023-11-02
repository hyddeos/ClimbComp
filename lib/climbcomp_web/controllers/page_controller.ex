defmodule ClimbcompWeb.PageController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competitions

  def home(conn, _params) do
    competitions_live = Competitions.list_live_competitions()
    competitions_completed = Competitions.list_completed_competitions()

    render(conn, :home,
      competitions_live: competitions_live,
      competitions_completed: competitions_completed
    )
  end

  def show(conn, %{"id" => competion_id}) do
    compeition = Competitions.get_compeition!(competion_id)

    render(conn, :show, compeition: compeition)
  end
end
