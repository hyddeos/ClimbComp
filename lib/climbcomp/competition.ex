defmodule Climbcomp.Competition do
  use Ecto.Schema
  import Ecto.Changeset

  schema "competition" do
    field :name, :string
    belongs_to :challenge, Climbcomp.Challenge
    field :competitors, {:array, :string}
    has_many :result, Climbcomp.Result
  end

  @required_fields ~w(name challenge_id competitors)a

  def changeset(competition, attrs) do
    competition
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
