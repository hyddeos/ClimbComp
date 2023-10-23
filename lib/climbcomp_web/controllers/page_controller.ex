defmodule ClimbcompWeb.PageController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Competitions

  def home(conn, _params) do
    compeitions = Competitions.list_competitions()
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, compeitions: compeitions)
  end

  def show(conn, %{"id" => competion_id}) do
    compeition = Competitions.get_compeition!(competion_id)

    render(conn, :show, compeition: compeition)
  end
end
