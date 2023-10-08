defmodule :"Elixir.Climbcomp.Repo.Migrations.Result-spelling-reqfields" do
  use Ecto.Migration

  def change do
    alter table(:result) do
      modify :attemps, :integer, null: false
      modify :time, :integer, null: false
    end
  end
end
