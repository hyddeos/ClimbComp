defmodule Climbcomp.Result do
  use Ecto.Schema
  import Ecto.Changeset

  schema "result" do
    field :competitor, :string
    field :points, :float
    field :time, :integer
    field :attempts, :integer

    belongs_to :competition, Climbcomp.Competition
    belongs_to :challenge, Climbcomp.Challenge
    belongs_to :problem, Climbcomp.Problem

    timestamps()
  end

  @required_fields ~w(competitor points competition_id challenge_id problem_id time attempts)a

  def changeset(result, attrs) do
    result
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
