defmodule Climbcomp.Repo.Migrations.CompetitionsUpdate do
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

  def change do
    create table(:competition) do
      add :competitor, :string
      add :competition_id, references(:competition, on_delete: :delete_all)
      add :problem_id, references(:problem)
      add :points, :float
      add :time, :integer
      add :attemps, :integer

      timestamps()
    end
  end
end
