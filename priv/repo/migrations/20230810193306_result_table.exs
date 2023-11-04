defmodule Climbcomp.Repo.Migrations.ResultTable do
  use Ecto.Migration

  def change do
    create table(:result) do
      add :attempts, :integer
      add :challenge_id, references(:challenges)
      add :competition_id, references(:competition, on_delete: :delete_all)
      add :competitor, :string
      add :points, :float
      add :problem_id, references(:problems)
      add :time, :integer

      timestamps()
    end
  end
end
