defmodule Climbcomp.Challenge do
  use Ecto.Schema
  import Ecto.Changeset

  alias Climbcomp.Repo
  alias Climbcomp.Problem

  schema "challenges" do
    field :name, :string
    has_many :problems, Problem

    timestamps()
  end

  def changeset(challenge, attrs) do
    challenge
    |> cast(attrs, [:name])
    |> validate_required(:name)
    |> unique_constraint(:name)
  end
end
