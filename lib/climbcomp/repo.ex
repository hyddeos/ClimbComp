defmodule Climbcomp.Repo do
  use Ecto.Repo,
    otp_app: :climbcomp,
    adapter: Ecto.Adapters.Postgres
end
