import Config

# Configure your database
config :climbcomp, Climbcomp.Repo,
  username: "hydde3",
  password: "localpasswordQSC!",
  hostname: "localhost",
  database: "climbcompdb",
  stacktrace: true,
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

config :climbcomp, ClimbcompWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {127, 0, 0, 1}, port: 4000],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "HgGgMAujscILGO76OkfmdExiHwrrxOXIlaKnPWWxzVednbANRanVZnlOgveQbUVF",
  watchers: [
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]},
    tailwind: {Tailwind, :install_and_run, [:default, ~w(--watch)]}
  ]
