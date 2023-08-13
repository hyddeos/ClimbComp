defmodule ClimbcompWeb.Router do
  use ClimbcompWeb, :router

  import ClimbcompWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ClimbcompWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  defp api_pipeline(conn, _) do
    conn
    |> put_resp_header("content-type", "application/json")
    |> put_resp_header("access-control-allow-origin", "*")
    |> put_resp_header("access-control-allow-headers", "authorization")
    |> put_resp_header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS")
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :api_pipeline
    plug :fetch_session
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  scope "/", ClimbcompWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  scope "/api", ClimbcompWeb do
    pipe_through :api

    post "/users/register", UserRegistrationController, :create
    post "/users/login", UserSessionController, :create
    post "/challenge", ChallengeController, :create
    get "/challenge", ChallengeController, :index
    post "/competition", CompetitionController, :create
    get "/competition", CompetitionController, :index
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:climbcomp, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: ClimbcompWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes

  scope "/", ClimbcompWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    # post "/users/register", UserRegistrationController, :create

    # post "/users/log_in", UserSessionController, :create
  end

  scope "/", ClimbcompWeb do
    pipe_through [:browser, :require_authenticated_user]

    get "/users/settings", UserSettingsController, :edit
    put "/users/settings", UserSettingsController, :update
    get "/users/settings/confirm_email/:token", UserSettingsController, :confirm_email
  end

  scope "/", ClimbcompWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete
    get "/users/confirm", UserConfirmationController, :new
    post "/users/confirm", UserConfirmationController, :create
    get "/users/confirm/:token", UserConfirmationController, :edit
    post "/users/confirm/:token", UserConfirmationController, :update
  end
end
