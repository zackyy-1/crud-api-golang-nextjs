// components/BrowserUsage.js
export default function BrowserUsage() {
  const browsers = [
    {
      name: "Chrome",
      company: "Google, Inc.",
      users: "35,502",
      growth: "12.75%",
      trend: "up"
    },
    {
      name: "Edge",
      company: "Microsoft Corporation, Inc.",
      users: "25,364",
      growth: "24.37%",
      trend: "up"
    },
    {
      name: "Firefox",
      company: "Mozilla Foundation, Inc.",
      users: "14,635",
      growth: "15.63%",
      trend: "up"
    },
    {
      name: "Safari",
      company: "Apple Corporation, Inc.",
      users: "35,657",
      growth: "12.54%",
      trend: "up"
    },
    {
      name: "Opera",
      company: "Opera, Inc.",
      users: "12,563",
      growth: "15.12%",
      trend: "up"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">BROWSER USAGE</h2>
      
      <div className="space-y-4">
        {browsers.map((browser, index) => (
          <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{browser.name}</h3>
              <p className="text-sm text-gray-500">{browser.company}</p>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">{browser.users}</p>
              <p className="text-sm text-green-600">{browser.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}