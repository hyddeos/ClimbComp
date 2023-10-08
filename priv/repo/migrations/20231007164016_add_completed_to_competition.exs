defmodule Climbcomp.Repo.Migrations.AddCompletedToCompetition do
  use Ecto.Migration

  def change do
    alter table(:competition) do
      add :completed, :boolean, default: false
    end
  end
end
