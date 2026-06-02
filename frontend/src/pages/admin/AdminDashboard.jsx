import { bikes } from "../../data/bikes";

const STATS = [
  {
    label: "Total Bikes",
    value: "1,248",
    icon: "two_wheeler",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    trend: { icon: "trending_up", text: "+12% from last month", color: "text-secondary" },
  },
  {
    label: "Active Users",
    value: "8,592",
    icon: "group",
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
    trend: { icon: "trending_up", text: "+5.2% from last month", color: "text-secondary" },
  },
  {
    label: "Reviews",
    value: "4,120",
    icon: "reviews",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    trend: { icon: "trending_flat", text: "Steady", color: "text-on-surface-variant" },
  },
  {
    label: "Most Viewed",
    value: "Honda CG 125",
    icon: "visibility",
    iconBg: "bg-error/10",
    iconColor: "text-error",
    isText: true,
    trend: { icon: "trending_up", text: "24k views today", color: "text-secondary" },
  },
];

const AdminDashboard = () => {
  const recent = bikes.slice(0, 3);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Dashboard Overview</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-surface-container-lowest p-6 rounded-xl border border-black/10 hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-md text-label-md text-on-surface-variant">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.iconBg} ${s.iconColor}`}>
                <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
              </div>
            </div>
            <span
              className={`${
                s.isText ? "font-headline-md text-headline-md truncate" : "font-headline-lg text-headline-lg"
              } text-on-surface`}
            >
              {s.value}
            </span>
            <span className={`font-label-sm text-label-sm flex items-center gap-1 ${s.trend.color}`}>
              <span className="material-symbols-outlined text-[16px]">{s.trend.icon}</span>
              {s.trend.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── Recent Bikes ── */}
      <div className="bg-surface-container-lowest rounded-xl border border-black/10 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-black/10 flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Bikes</h3>
          <a
            href="/admin/bikes"
            className="font-label-md text-label-md text-primary hover:text-surface-tint transition-colors flex items-center gap-1"
          >
            View all
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-black/10">
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Model</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Brand</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Engine</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Price (PKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {recent.map((b) => (
                <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-container border border-black/5 flex items-center justify-center shrink-0 overflow-hidden">
                        {b.image ? (
                          <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">two_wheeler</span>
                        )}
                      </div>
                      <span className="font-medium text-on-surface">{b.model}</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant hidden sm:table-cell">{b.brand}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-[#1c1c1e] text-white rounded-full font-label-sm text-label-sm">
                      {b.cc}cc
                    </span>
                  </td>
                  <td className="p-4 text-on-surface hidden md:table-cell">
                    {b.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
