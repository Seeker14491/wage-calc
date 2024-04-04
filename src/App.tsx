import { makePersisted } from "@solid-primitives/storage";
import { Component, Show, createSignal } from "solid-js";
import ThemeToggle from "./components/ThemeToggle";

const App: Component = () => {
  const [basePay, setBasePay] = makePersisted(createSignal(0), {
    name: "basePay",
  });
  const [overtimePay, setOvertimePay] = makePersisted(createSignal(0), {
    name: "overtimePay",
  });
  const [hoursWorked, setHoursWorked] = makePersisted(createSignal(0), {
    name: "hoursWorked",
  });
  const [darkMode, setDarkMode] = makePersisted(createSignal(false), {
    name: "darkMode",
  });

  const baseHours = () => Math.min(hoursWorked(), 80);
  const overtimeHours = () => Math.max(hoursWorked() - 80, 0);
  const baseEarnings = () => baseHours() * basePay();
  const overtimeEarnings = () => overtimeHours() * overtimePay();
  const totalEarnings = () => baseEarnings() + overtimeEarnings();

  const inputsAreValid = () =>
    basePay() >= 0 && overtimePay() >= basePay() && hoursWorked() >= 0;

  const formatDollars = (dollars: number) =>
    dollars.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div class="flex min-h-svh flex-col items-center justify-between">
      <div>
        <h1 class="mb-4 mt-2 text-2xl font-bold">Earnings Calculator</h1>
        <div class="grid gap-y-4">
          <label class="block">
            <div class="mb-2">Hourly Base Pay:</div>
            <div class="input input-bordered flex items-center">
              $
              <input
                class="spinner-none"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={basePay()}
                onInput={(e) => setBasePay(Number(e.currentTarget.value))}
              />
            </div>
          </label>
          <label class="block">
            <div class="mb-2">Hourly Overtime Pay:</div>
            <div class="input input-bordered flex items-center">
              $
              <input
                class="spinner-none"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={overtimePay()}
                onInput={(e) => setOvertimePay(Number(e.currentTarget.value))}
              />
            </div>
          </label>
          <label class="block">
            <div class="mb-2">Hours Worked (2 weeks):</div>
            <input
              class="input input-bordered spinner-none w-full"
              type="number"
              inputmode="numeric"
              step="any"
              value={hoursWorked()}
              onInput={(e) => setHoursWorked(Number(e.currentTarget.value))}
            />
          </label>
        </div>
        <div class="stat mt-4 p-0">
          <div class="stat-title text-base-content">Total Earnings</div>
          <div class="stat-value">
            <Show when={inputsAreValid()} fallback="error">
              {formatDollars(totalEarnings())}
            </Show>
          </div>
          <Show when={inputsAreValid()}>
            <div class="stat-desc">
              ({formatDollars(basePay())} * {baseHours()})
              <Show when={overtimeHours() > 0}>
                {" "}
                + ({formatDollars(overtimePay())} *{" "}
                {Number(overtimeHours().toFixed(2))})
              </Show>
            </div>
          </Show>
        </div>
      </div>
      <div class="mb-2 mt-12">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default App;
