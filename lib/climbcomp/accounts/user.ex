defmodule Climbcomp.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
    |> unique_constraint(:email)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 8)
    |> put_password_hash(attrs)
  end

  defp put_password_hash(changeset, attrs) do
    case attrs["password"] do
      nil ->
        changeset

      password ->
        password_hash = HashUtils.hash_password(password)
        put_change(changeset, :password, password_hash)
    end
  end
end
