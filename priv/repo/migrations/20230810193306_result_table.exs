defmodule Climbcomp.Repo.Migrations.ResultTable do
  use Ecto.Migration

  def change do
    create table(:result) do
      add :competitor, :string
      add :points, :float
      add :time, :integer
      add :attemps, :integer

      add :competition_id, references(:competition, on_delete: :delete_all)
      add :challenge_id, references(:challenges)
      add :problem_id, references(:problems)

      timestamps()
    end
  end
end
