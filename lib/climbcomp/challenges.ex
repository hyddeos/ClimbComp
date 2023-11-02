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

  def get_challenge!(challange_id, options \\ []) do
    Challenge
    |> Repo.get!(challange_id)
    |> Repo.preload(Keyword.get(options, :preload, []))
  end

  def delete_challange(%Challenge{} = challenge) do
    Repo.delete(challenge)
  end
end
