defmodule ClimbcompWeb.ResultController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Results
  alias Climbcomp.Repo

  def index(conn, _params) do
    "hej"
  end

  def get_current_state(competition_id) do
    current_state = Results.current_state(competition_id)
    current_state
  end
end
