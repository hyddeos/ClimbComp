defmodule Climbcomp.Repo.Migrations.CompetitionTable do
  use Ecto.Migration

  def change do
    create table(:competition) do
      add :name, :string
      add :challenge_id, references(:challenges)
      add :competitors, {:array, :string}

      timestamps()
    end

    create unique_index(:competition, [:name])
  end
end
