defmodule Climbcomp.Competition do
  use Ecto.Schema
  import Ecto.Changeset

  schema "competition" do
    field :name, :string
    field :competitors, {:array, :string}
    field :completed, :boolean, default: false

    belongs_to :challenge, Climbcomp.Challenge

    has_many :result, Climbcomp.Result

    timestamps()
  end

  @required_fields ~w(name challenge_id competitors completed)a

  def changeset(competition, attrs) do
    competition
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
