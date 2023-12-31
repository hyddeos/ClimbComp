defmodule ClimbcompWeb.UserSessionController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Accounts
  alias ClimbcompWeb.UserAuth

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAuth.log_in_user(user, user_params)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      conn
      |> put_view(ClimbcompWeb.ErrorJSON)
      |> put_status(400)
      |> render("error.json", error: "bad credintials")
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end
end
