defmodule Climbcomp.Challenges do
  alias Climbcomp.Challenge
  alias Climbcomp.Repo

  @doc """
  Creates a new challenge

  ## Examples

      iex> create_challenge(params)
      {:ok, %Challenge{name: "C9", problems: []}}

  """
  def create_challenge(params) do
    %Challenge{}
    |> Challenge.changeset(params)
    |> Ecto.Changeset.cast_assoc(:problems)
    |> Repo.insert()
  end

  def list_challanges do
    Climbcomp.Challenge
    |> Repo.all()
    |> Repo.preload(:problems)
  end
end
