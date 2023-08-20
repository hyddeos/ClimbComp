defmodule Climbcomp.Repo.Migrations.ResultTable do
  use Ecto.Migration

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
