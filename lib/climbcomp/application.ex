defmodule Climbcomp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      ClimbcompWeb.Telemetry,
      # Start the Ecto repository
      Climbcomp.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Climbcomp.PubSub},
      # Start Finch
      {Finch, name: Climbcomp.Finch},
      # Start the Endpoint (http/https)
      ClimbcompWeb.Endpoint
      # Start a worker by calling: Climbcomp.Worker.start_link(arg)
      # {Climbcomp.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Climbcomp.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ClimbcompWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
