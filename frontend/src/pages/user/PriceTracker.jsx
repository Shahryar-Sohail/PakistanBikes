import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   10-Year Historical Market Data (PKR averages)
───────────────────────────────────────────── */
const TREND_DATA = [
  { year: "2014", avg: 75000 },
  { year: "2015", avg: 78000 },
  { year: "2016", avg: 82000 },
  { year: "2017", avg: 95000 },
  { year: "2018", avg: 118000 },
  { year: "2019", avg: 145000 },
  { year: "2020", avg: 162000 },
  { year: "2021", avg: 215000 },
  { year: "2022", avg: 275000 },
  { year: "2023", avg: 310000 },
  { year: "2024", avg: 368000 },
];

/* ─────────────────────────────────────────────
   Live Price Index Data
───────────────────────────────────────────── */
const PRICE_INDEX = [
  {
    id: 1,
    name: "Honda CD 70",
    variant: "2024 Self Start",
    brand: "Honda",
    category: "70cc",
    currentPrice: 157900,
    prevPrice: 144900,
    image: null,
  },
  {
    id: 4,
    name: "Yamaha YBR 125G",
    variant: "2024 Off-Road Edition",
    brand: "Yamaha",
    category: "125cc",
    currentPrice: 485000,
    prevPrice: 420000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_MMZA2GY3FC-Ck_MvMTn2vryichU5ZMP3o7TQE7OH6unhg_XMGCvWO9Sj_XbmEXw1zRUMLFSfvFyGDXMRQD95OQ77tpdCifBFEBOHH1a-XFdRDz9WVs0VuyyS7L0LyNagG6X7fqInlX-CYxzKSRsZaIUPtxebIV32x3wny1rC1xN0Au0bMJDAsxfrQnvxxeaFpegfitD2oF_K6LxpCCNSiZmXpAftJ5HoSs5x_xQ5AkPkBA_yZeJ75n9aucwEFHXO3ZjtVtpfW-Eq",
  },
  {
    id: 5,
    name: "Suzuki GR 150",
    variant: "Standard 2024",
    brand: "Suzuki",
    category: "150cc",
    currentPrice: 382000,
    prevPrice: 350000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTaSZRVEe-IhBnxmCy56gaC7RbKfmT1-hqbe99MgQE1NvGjxZj1VCjcJuC5sYMNmewhyZ9-p8F0yuXHa-m8ZJyY9khUqtJU8GreTT8_IrVlq5L3VEYNMnJEImIlbQlA7x_zVGfDwGrD72glL9JkYgWf9QLAsW_ZUtd46XjVO7qJlEBUx0x7cWsW0Kd3V0TSb2ubYI1uaas1lclZMvTxJJKl2ao-caOsun1Kkmhj6xF56uTTQUP3mM6WWC_kRGqjv8zXYN-ir0S8Wba",
  },
  {
    id: 2,
    name: "Honda CG 125",
    variant: "Self-Start Gold Edition",
    brand: "Honda",
    category: "125cc",
    currentPrice: 292900,
    prevPrice: 270000,
    image: null,
  },
  {
    id: 3,
    name: "Honda CB 150F",
    variant: "Sports Edition 2024",
    brand: "Honda",
    category: "150cc",
    currentPrice: 420000,
    prevPrice: 395000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6dqJTlf5-g9jFHgOfpy-Ssfih6VJXByTBiS7srkuHJKaCIewCOzt6XiYd5CQANvuZZcBO-UP554cASrIrKmsbqRSBwB-uyy1aujdex_J--GKucPxul7Ny4qwvXXmstG9VxX8cpvxESq19qb_NB5QlKbDlimye5eSFtO5gXOtlvY3vcsnDdSQVnX0f2EqZvnh2ew9v-RDioYG5qFoOG2wlcvd9hOZuf_qLI6IZsV9FBHEFFS3M1gZ7F_kZBx6S-e3i3siH-0eYVkHD",
  },
  {
    id: 6,
    name: "United US 70",
    variant: "Standard 2024",
    brand: "United",
    category: "70cc",
    currentPrice: 142000,
    prevPrice: 135000,
    image: null,
  },
  {
    id: 7,
    name: "Yamaha YBZ 125",
    variant: "Fuel Injection 2024",
    brand: "Yamaha",
    category: "125cc",
    currentPrice: 360000,
    prevPrice: 340000,
    image: null,
  },
  {
    id: 8,
    name: "Ravi Storm 100",
    variant: "Standard 2024",
    brand: "Ravi",
    category: "100cc",
    currentPrice: 155000,
    prevPrice: 145000,
    image: null,
  },
];

const BRANDS = ["All Brands", "Honda", "Yamaha", "Suzuki", "United", "Ravi"];
const CATEGORIES = ["All Categories", "70cc", "100cc", "125cc", "150cc"];

/* ─────────────────────────────────────────────
   SVG Area-Line Chart Component
───────────────────────────────────────────── */
const PriceTrendChart = () => {
  const W = 600;
  const H = 280;
  const PAD = { top: 20, right: 20, bottom: 40, left: 56 };

  const minVal = 50000;
  const maxVal = 400000;

  const toX = (i) =>
    PAD.left + (i / (TREND_DATA.length - 1)) * (W - PAD.left - PAD.right);
  const toY = (v) =>
    PAD.top + ((maxVal - v) / (maxVal - minVal)) * (H - PAD.top - PAD.bottom);

  // Build path strings
  const points = TREND_DATA.map((d, i) => ({ x: toX(i), y: toY(d.avg) }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = [
    `M${points[0].x},${H - PAD.bottom}`,
    ...points.map((p) => `L${p.x},${p.y}`),
    `L${points[points.length - 1].x},${H - PAD.bottom}`,
    "Z",
  ].join(" ");

  // Y-axis ticks
  const yTicks = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000];
  const formatK = (v) => `${v / 1000}k`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-label="10-year bike price trend chart"
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9e2016" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#9e2016" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Y-axis grid lines + labels */}
      {yTicks.map((tick) => {
        const y = toY(tick);
        return (
          <g key={tick}>
            <line
              x1={PAD.left}
              y1={y}
              x2={W - PAD.right}
              y2={y}
              stroke="#e1bfb9"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={PAD.left - 6}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#8d706c"
              fontFamily="Inter, sans-serif"
            >
              {formatK(tick)}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {TREND_DATA.map((d, i) => (
        <text
          key={d.year}
          x={toX(i)}
          y={H - PAD.bottom + 16}
          textAnchor="middle"
          fontSize="10"
          fill="#8d706c"
          fontFamily="Inter, sans-serif"
        >
          {d.year}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#9e2016" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fcf8fb" stroke="#9e2016" strokeWidth="2" />
      ))}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   YoY Change Badge
───────────────────────────────────────────── */
const YoYBadge = ({ current, prev }) => {
  const pct = (((current - prev) / prev) * 100).toFixed(1);
  const up = current >= prev;
  return (
    <span className={`font-label-md text-label-md font-semibold ${up ? "text-primary" : "text-secondary"}`}>
      <span className="material-symbols-outlined text-[14px] align-middle mr-0.5">
        {up ? "arrow_upward" : "arrow_downward"}
      </span>
      {up ? "+" : ""}{pct}%
    </span>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const PriceTracker = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [category, setCategory] = useState("All Categories");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return PRICE_INDEX.filter((b) => {
      const matchSearch =
        search === "" ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.variant.toLowerCase().includes(search.toLowerCase());
      const matchBrand = brand === "All Brands" || b.brand === brand;
      const matchCat = category === "All Categories" || b.category === category;
      return matchSearch && matchBrand && matchCat;
    });
  }, [search, brand, category]);

  const displayed = showAll ? filtered : filtered.slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      {/* ════════════════════════════════════════════
           HERO BANNER
      ════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "260px" }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6dqJTlf5-g9jFHgOfpy-Ssfih6VJXByTBiS7srkuHJKaCIewCOzt6XiYd5CQANvuZZcBO-UP554cASrIrKmsbqRSBwB-uyy1aujdex_J--GKucPxul7Ny4qwvXXmstG9VxX8cpvxESq19qb_NB5QlKbDlimye5eSFtO5gXOtlvY3vcsnDdSQVnX0f2EqZvnh2ew9v-RDioYG5qFoOG2wlcvd9hOZuf_qLI6IZsV9FBHEFFS3M1gZ7F_kZBx6S-e3i3siH-0eYVkHD')",
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        {/* Content */}
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop py-14 max-w-container-max mx-auto">
          <h1 className="font-headline-lg text-headline-lg text-on-primary mb-3 max-w-lg leading-tight">
            Bike Price Insights
          </h1>
          <p className="font-body-md text-body-md text-on-primary/80 max-w-md leading-relaxed">
            Decoding a decade of market shifts. Monitor fluctuations, track historical data, and
            make informed purchasing decisions with Pakistan's most precise price analytics engine.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           CHART + MARKET ALERT
      ════════════════════════════════════════════ */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-gutter">

          {/* ── Trend Chart Card ── */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 md:p-8 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  10-Year Price Trend
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Average Market Price in PKR (2014 – 2024)
                </p>
              </div>
              {/* Growth badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm whitespace-nowrap">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +142% Decadal Growth
              </span>
            </div>
            {/* SVG Chart */}
            <PriceTrendChart />
          </div>

          {/* ── Market Alert Card ── */}
          <div className="bg-primary rounded-xl p-6 flex flex-col justify-between shadow-sm min-h-[260px]">
            {/* Top section */}
            <div>
              <div className="flex items-center justify-between mb-auto">
                <div className="w-10 h-10 bg-on-primary/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[22px]">
                    bar_chart
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-primary/70 tracking-widest uppercase">
                  Market Alert
                </span>
              </div>
            </div>
            {/* Bottom content */}
            <div className="mt-8">
              <h3 className="font-headline-md text-headline-md text-on-primary mb-3">
                Honda CG125 Peak Value
              </h3>
              <p className="font-body-md text-body-md text-on-primary/80 leading-relaxed">
                The standard 125cc segment has seen a 15% surge in the last quarter due to supply
                chain adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
           LIVE PRICE INDEX TABLE
      ════════════════════════════════════════════ */}
      <section className="px-margin-mobile md:px-margin-desktop pb-16 max-w-container-max mx-auto">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden">

          {/* Table Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface shrink-0">
              Live Price Index
            </h2>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                </div>
                <input
                  type="text"
                  placeholder="Search bike model..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    pl-9 pr-4 py-2 w-full sm:w-56
                    bg-surface-container-low border border-outline/20 rounded-lg
                    font-body-md text-body-md text-on-surface
                    placeholder:text-on-surface-variant
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all
                  "
                />
              </div>
              {/* Brand filter */}
              <div className="relative">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="
                    appearance-none pl-4 pr-8 py-2
                    bg-surface-container-low border border-outline/20 rounded-lg
                    font-label-md text-label-md text-on-surface
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all cursor-pointer
                  "
                >
                  {BRANDS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-outline text-[18px] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  expand_more
                </span>
              </div>
              {/* Category filter */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    appearance-none pl-4 pr-8 py-2
                    bg-surface-container-low border border-outline/20 rounded-lg
                    font-label-md text-label-md text-on-surface
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                    transition-all cursor-pointer
                  "
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-outline text-[18px] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* ── Table ── */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low/50">
                  <th className="text-left px-6 py-3 font-label-md text-label-md text-on-surface-variant">
                    Bike Model
                  </th>
                  <th className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant">
                    Current Price
                  </th>
                  <th className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant">
                    Price (2023)
                  </th>
                  <th className="text-left px-4 py-3 font-label-md text-label-md text-on-surface-variant">
                    YoY Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayed.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-on-surface-variant font-body-md text-body-md">
                      No bikes match your filters.
                    </td>
                  </tr>
                ) : (
                  displayed.map((bike) => (
                    <tr
                      key={bike.id}
                      onClick={() => navigate(`/bike/${bike.id}`)}
                      className="border-b border-outline-variant/10 hover:bg-surface-container-low/60 transition-colors cursor-pointer group"
                    >
                      {/* Model */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Thumbnail */}
                          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden border border-outline-variant/10">
                            {bike.image ? (
                              <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="material-symbols-outlined text-outline text-[20px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}>
                                two_wheeler
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
                              {bike.name}
                            </p>
                            <p className="font-label-sm text-label-sm text-on-surface-variant">
                              {bike.variant}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">
                        {bike.category}
                      </td>

                      {/* Current Price */}
                      <td className="px-4 py-4 font-label-md text-label-md text-on-surface">
                        PKR {bike.currentPrice.toLocaleString()}
                      </td>

                      {/* Previous Price */}
                      <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">
                        PKR {bike.prevPrice.toLocaleString()}
                      </td>

                      {/* YoY Change */}
                      <td className="px-4 py-4">
                        <YoYBadge current={bike.currentPrice} prev={bike.prevPrice} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* View More / Less */}
          {filtered.length > 4 && (
            <div className="flex justify-center py-5 border-t border-outline-variant/10">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors"
              >
                {showAll
                  ? `Show Less`
                  : `View Full Dataset (${filtered.length} Models)`}
                <span className="material-symbols-outlined text-[18px]">
                  {showAll ? "expand_less" : "expand_more"}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PriceTracker;
