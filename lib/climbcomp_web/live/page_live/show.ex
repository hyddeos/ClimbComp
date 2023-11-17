defmodule ClimbcompWeb.PageLive.Show do
  use ClimbcompWeb, :live_view

  alias Climbcomp.Competitions
  alias Climbcomp.Problem
  alias Climbcomp.Result
  alias Climbcomp.Results

  def mount(%{"id" => competition_id}, _session, socket) do
    competition = load_competition!(competition_id)

    if connected?(socket) do
      Competitions.subscribe(competition) |> IO.inspect(label: "subscribe")
    end

    socket =
      socket
      |> assign(:competition, competition)
      |> assign(:scoreboard, Results.get_sorted_scoreboard(competition))

    {:ok, socket}
  end

  def handle_info(:updated_results, socket) do
    competition = load_competition!(socket.assigns.competition.id)

    socket =
      socket
      |> assign(:competition, competition)
      |> assign(:scoreboard, Results.get_sorted_scoreboard(competition))

    {:noreply, socket}
  end

  defp load_competition!(competition_id) do
    Competitions.get_competition!(competition_id,
      preload: [:result, challenge: :problems]
    )
  end

  def render(assigns) do
    ~H"""
    <div class="my-4">
      <h1 class="text-3xl capitalize text-accent-200 font-bold"><%= @competition.name %></h1>
    </div>

    <div class="bg-bg-200 drop-shadow rounded-lg mt-4 p-2 px-4">
      <h3 class="text-2xl font-semibold">Scoreboard</h3>
      <div class="grid grid-cols-7 gap-2 mt-4">
        <p>
          <%= Heroicons.icon("trophy",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Rank</span>
        </p>
        <p class="col-span-2 ">
          <%= Heroicons.icon("user",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Competitor</span>
        </p>
        <p>
          <%= Heroicons.icon("chart-bar",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Points</span>
        </p>
        <p>
          <%= Heroicons.icon("arrow-path",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Attempts</span>
        </p>
        <p>
          <%= Heroicons.icon("clock",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Time</span>
        </p>
        <p>
          <%= Heroicons.icon("question-mark-circle",
            type: "solid",
            class: "mt-2 h-5 w-5 text-text-100 text-right"
          ) %> <span class="hidden md:inline">Problems</span>
        </p>
      </div>
      <%= for {competitor, rank} <- Enum.with_index(@scoreboard.competitors_scores) do %>
        <div class="grid grid-cols-7 gap-2 mt-4">
          <p class="cols-span-1">
            <%= rank + 1 %>
          </p>
          <p class="col-span-2 overflow-hidden">
            <%= competitor.competitor %>
          </p>
          <p class="cols-span-1">
            <%= competitor.score %>
          </p>
          <p class="cols-span-1 pl-1">
            <%= competitor.attempts %>
          </p>
          <p class="cols-span-1">
            <%= competitor.time %>
          </p>
          <p class="cols-span-1 pl-2">
            <%= competitor.problems %>
          </p>
        </div>
      <% end %>
    </div>

    <%= for {problem, index} <- Enum.with_index(@competition.challenge.problems, 1) do %>
      <div class="bg-bg-200 drop-shadow rounded-lg mt-4 p-2 px-4">
        <header class="flex flex-row justify-between">
          <h3 class="text-2xl font-semibold overflow-hidden">
            <%= "Problem #{index} - #{problem.name}" %>
          </h3>
          <div class="flex items-center gap-1">
            <p>Grade:<span class="font-semibold"> <%= problem.grade %></span></p>
            <.tooltip position={:top}>
              <:trigger>
                <.icon name="hero-question-mark-circle-solid" class="text-accent-100 w-8 h-8" />
              </:trigger>

              <:content>
                Toppoints: <span class="font-semibold"><%= problem.toppoints %></span>
                <br /> Zonepoints: <span class="font-semibold"><%= problem.zonepoints %></span>
                <br /> Timelimit: <span class="font-semibold"><%= problem.timelimit %></span>
                sec <br /> Position: <span class="font-semibold"><%= problem.position %></span>
              </:content>
            </.tooltip>
          </div>
        </header>

        <div class="grid grid-cols-7 gap-2 mt-4">
          <p class="col-span-2 ">
            <%= Heroicons.icon("user",
              type: "solid",
              class: "mt-2 h-5 w-5 text-text-100 text-right"
            ) %> <span class="hidden md:inline">Competitor</span>
          </p>
          <p>
            <%= Heroicons.icon("chart-bar",
              type: "solid",
              class: "mt-2 h-5 w-5 text-text-100 text-right"
            ) %> <span class="hidden md:inline">Points</span>
          </p>
          <p>
            <%= Heroicons.icon("arrow-path",
              type: "solid",
              class: "mt-2 h-5 w-5 text-text-100 text-right"
            ) %> <span class="hidden md:inline">Attempts</span>
          </p>
          <p>
            <%= Heroicons.icon("clock",
              type: "solid",
              class: "mt-2 h-5 w-5 text-text-100 text-right"
            ) %> <span class="hidden md:inline">Time</span>
          </p>
          <p>
            <%= Heroicons.icon("question-mark-circle",
              type: "solid",
              class: "mt-2 h-5 w-5 text-text-100 text-right"
            ) %> <span class="hidden md:inline">Topped?</span>
          </p>
        </div>

        <%= for result <- results_for_problem(@competition.result, problem.id) do %>
          <div class="grid grid-cols-7 gap-2 mt-4">
            <p class="col-span-2 overflow-hidden"><%= result.competitor %></p>
            <p class="cols-span-1"><%= round(result.points) %></p>
            <p class="cols-span-1 pl-1"><%= result.attempts %></p>
            <p class="cols-span-1"><%= result.time %></p>
            <p class="cols-span-1 pl-2">
              <%= if topped_problem?(result, problem) do %>
                <.icon name="hero-check-badge-solid" class="text-yellow-600" />
              <% else %>
                <.icon name="hero-no-symbol-solid" class="text-red-500" />
              <% end %>
            </p>
          </div>
        <% end %>
      </div>
    <% end %>
    """
  end

  defp results_for_problem(results, problem_id) do
    Enum.filter(results, &(&1.problem_id == problem_id))
  end

  defp topped_problem?(%Result{points: points}, %Problem{toppoints: toppoints}) do
    points == toppoints
  end
end
