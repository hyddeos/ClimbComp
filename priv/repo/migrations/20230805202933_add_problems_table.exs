defmodule Climbcomp.Repo.Migrations.AddProblemsTable do
  use Ecto.Migration

  def change do
    create table(:problems) do
      add :name, :string
      add :position, :string
      add :type, :string
      add :grade, :string
      add :timelimit, :integer
      add :zonepoints, :integer
      add :toppoints, :integer
      add :challenge_id, references(:challenges, on_delete: :delete_all)
    end
  end
end
