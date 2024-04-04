import { Component, createSignal } from "solid-js";

const App: Component = () => {
  const [basePay, setBasePay] = createSignal(0);
  const [overtimePay, setOvertimePay] = createSignal(0);
  const [hoursWorked, setHoursWorked] = createSignal(0);
  const [totalEarnings, setTotalEarnings] = createSignal(0);

  const calculateEarnings = () => {
    const baseHours = Math.min(hoursWorked(), 80);
    const overtimeHours = Math.max(hoursWorked() - 80, 0);
    const baseEarnings = baseHours * basePay();
    const overtimeEarnings = overtimeHours * overtimePay();
    setTotalEarnings(baseEarnings + overtimeEarnings);
  };

  return (
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-2xl font-bold">Earnings Calculator</h1>
      <div class="mb-4">
        <label class="mb-2 block">Hourly Base Pay:</label>
        <input
          type="number"
          class="rounded border border-gray-300 px-2 py-1"
          onInput={(e) => setBasePay(Number(e.currentTarget.value))}
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block">Hourly Overtime Pay:</label>
        <input
          type="number"
          class="rounded border border-gray-300 px-2 py-1"
          onInput={(e) => setOvertimePay(Number(e.currentTarget.value))}
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block">Hours Worked (2 weeks):</label>
        <input
          type="number"
          class="rounded border border-gray-300 px-2 py-1"
          onInput={(e) => setHoursWorked(Number(e.currentTarget.value))}
        />
      </div>
      <button
        class="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={calculateEarnings}
      >
        Calculate Earnings
      </button>
      <div class="mt-4">
        <p class="text-xl">Total Earnings: ${totalEarnings().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default App;
