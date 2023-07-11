defmodule ClimbcompWebWeb.RegistrationController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Accounts

  def new(conn, _params) do
    changeset = Accounts.change_user(%Accounts.User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    changeset = Accounts.change_user(%Accounts.User{}, user_params)

    case Accounts.create_user(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User created successfully.")
        |> redirect(to: Routes.user_path(conn, :show, user))

      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
