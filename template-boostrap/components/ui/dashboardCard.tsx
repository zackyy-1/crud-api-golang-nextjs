// components/DashboardCards.js
import { useTheme } from "../context/themeContext";

export default function DashboardCards() {
  const { themeMode } = useTheme(); // ambil dari context

  const cards = [
    {
      title: "Today Orders",
      value: "5,472",
      change: "+427",
      trend: "up",
      description: "Last week"
    },
    {
      title: "Today Earnings",
      value: "$7,589",
      change: "-453",
      trend: "down",
      description: "Last week"
    },
    {
      title: "Profit Gain",
      value: "$8,943",
      change: "+788",
      trend: "up",
      description: "Last week"
    },
    {
      title: "Total Earnings",
      value: "$57.2M",
      change: "-693",
      trend: "down",
      description: "Last week"
    }
  ];

  return (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg shadow p-6 transition-colors duration-300"
          style={{
            backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
            color: themeMode === "dark" ? "#e5e7eb" : "#111827",
          }}
        >
          <h2 className="text-lg font-semibold mb-2">
            {card.title}
          </h2>
          <p className="text-2xl font-bold mb-2">{card.value}</p>
          <p
            className={`flex items-center ${
              card.trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {card.description}
            <span className="ml-1">
              {card.trend === "up" ? "▲" : "▼"} {card.change}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}