defmodule Climbcomp.Repo.Migrations.RenameColumnInResultTable do
  use Ecto.Migration

  def change do
    rename table(:result), :attemps, to: :attempts
  end
end
