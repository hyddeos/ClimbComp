defmodule Climbcomp.Problem do
  use Ecto.Schema
  import Ecto.Changeset

  schema "problems" do
    field :name, :string
    field :position, :string
    field :type, :string
    field :grade, :string
    field :timelimit, :integer
    field :zonepoints, :integer
    field :toppoints, :integer

    belongs_to :challenge, Climbcomp.Challenge
  end

  @required_fields ~w(name type grade timelimit zonepoints toppoints)a

  def changeset(problem, attrs) do
    problem
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
