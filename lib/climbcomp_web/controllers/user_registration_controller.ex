defmodule ClimbcompWeb.UserRegistrationController do
  use ClimbcompWeb, :controller

  alias Climbcomp.Accounts
  alias ClimbcompWeb.UserAuth

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            &url(~p"/users/confirm/#{&1}")
          )

        conn
        |> UserAuth.log_in_user(user)
        |> json(%{status: "succes"})

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_view(ClimbcompWeb.ErrorJSON)
        |> put_status(422)
        |> render("error.json", changeset: changeset)
    end
  end
end
