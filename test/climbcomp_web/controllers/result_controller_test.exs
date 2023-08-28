defmodule ClimbcompWeb.ResultControllerTest do
  use ClimbcompWeb.ConnCase

  alias Climbcomp.Repo
  alias Climbcomp.Results
  alias Climbcomp.Result

  test "POST /api/result", %{conn: conn} do
    {:ok, data} = Climbcomp.Results.save_result(data)

    params = %{
      competitor: "eric",
      challenge_id: "1",
      competition_id: "2",
      problem_id: "2",
      points: "5",
      time: "132",
      attempts: "6"
    }

    conn = post(conn, ~p"/api/result", %{"competition" => params})

    assert %{
             "name" => "boop",
             "challenge_id" => ^challenge_id,
             "competitors" => ["eric", "rickard", "isabel"]
           } = json_response(conn, 201)

    assert %Competition{name: "boop"} = Repo.one(Competition)
  end
end
