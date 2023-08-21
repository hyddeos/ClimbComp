defmodule ClimbcompWeb.CompetitionControllerTest do
  use ClimbcompWeb.ConnCase

  alias Climbcomp.Repo
  alias Climbcomp.Competition

  test "POST /api/competition", %{conn: conn} do
    {:ok, %{id: challenge_id}} = Climbcomp.Challenges.create_challenge(%{name: "my challenge"})

    params = %{
      name: "boop",
      competitors: ["eric", "rickard", "isabel"],
      challenge_id: challenge_id
    }

    conn = post(conn, ~p"/api/competition", %{"competition" => params})

    assert %{
             "name" => "boop",
             "challenge_id" => ^challenge_id,
             "competitors" => ["eric", "rickard", "isabel"]
           } = json_response(conn, 201)

    assert %Competition{name: "boop"} = Repo.one(Competition)
  end
end
