defmodule Mix.Tasks.Reactapp do
  @moduledoc """
  Mix Task responsible for building the React frontend for
  production.
  """

  use Mix.Task
  require Logger
  # Path for the frontend static assets that are being served
  # from our Phoenix router when accessing /app/* for the first time
  @public_path "./priv/static/frontend"

  @shortdoc "Compile and bundle React frontend for production"
  def run(_) do
    Logger.info("📦 - Installing NPM packages")
    Logger.info("📦 - HEJ ERIC")
    System.cmd("npm", ["--prefix", "frontend", "ci"])

    Logger.info("⚙️  - Compiling React frontend")
    System.cmd("npm", ["--prefix", "frontend", "run", "build"])

    Logger.info("Creating `frontend` folder if not exists")
    System.cmd("mkdir", ["-p", @public_path])

    Logger.info("🚛 - Moving dist folder to Phoenix at #{@public_path}")
    # First clean up any stale files from previous builds if any
    System.cmd("rm", ["-rf", @public_path])
    System.cmd("cp", ["-R", "./frontend/dist", @public_path])

    Logger.info("⚛️  - React frontend ready.")
  end
end
