defmodule Climbcomp.Competitions do
  alias Climbcomp.Competition
  alias Climbcomp.Repo

  def create_competition(params) do
    IO.inspect(params, label: "INSPECT PARAMS2")

    %Competition{}
    |> Competition.changeset(params)
    |> Ecto.Changeset.cast_assoc(:challenge)
    |> Repo.insert()
  end

  def list_competitions do
    Competition
    |> Repo.all()
  end
end
