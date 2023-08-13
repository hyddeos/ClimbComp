defmodule Climbcomp.Competition do
  use Ecto.Schema
  import Ecto.Changeset

  schema "competition" do
    field :name, :string
    has_one :challenge, Climbcomp.Challenge
    field :competitors, {:array, :string}
    has_many :result, Climbcomp.Result
  end

  @required_fields ~w(name challenge competitors)a

  def changeset(competition, attrs) do
    competition
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
