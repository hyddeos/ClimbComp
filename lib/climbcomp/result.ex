defmodule Climbcomp.Result do
  use Ecto.Schema
  import Ecto.Changeset

  schema "result" do
    field :competitor, :string
    belongs_to :challenge, Climbcomp.Challenge
    has_one :problem, Climbcomp.Problem
    field :points, :float
    field :time, :integer
    field :attemps, :integer
  end

  @required_fields ~w(name challenge problem points)a

  def changeset(result, attrs) do
    result
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
