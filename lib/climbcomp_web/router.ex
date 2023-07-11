defmodule ClimbcompWeb.Router do
  use ClimbcompWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ClimbcompWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  defp api_pipeline(conn, _) do
    conn
    |> put_resp_header("content-type", "application/json")
    |> put_resp_header("access-control-allow-origin", "*")
    |> put_resp_header("access-control-allow-headers", "authorization")
    |> put_resp_header("access-control-allow-methods", "GET, POST, PUT, DELETE")
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :api_pipeline
  end

  scope "/", ClimbcompWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  scope "/api", ClimbcompWeb do
    pipe_through :api
    post "/login", AuthenticationController, :login
    post "/register", RegistrationController, :create
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
end
