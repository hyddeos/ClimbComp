defmodule Climbcomp.Competitions do
  alias Climbcomp.Competition
  alias Climbcomp.Repo

  @doc """
  Creates a new Comp

  ## Examples

      iex> create_challenge(params)
      {:ok, %Challenge{name: "C9", problems: []}}

  """
  def create_competition(params) do
    %Competition{}
    |> Competition.changeset(params)
    |> Ecto.Changeset.cast_assoc(:challenge)
    |> Repo.insert()
  end

  def list_competitions do
    Competition
    |> Repo.all()
    |> Repo.preload(:challenges)
  end
end
