import { useState } from "react";

const MOCK_REVIEWS = [
  { id: 1, bike: "Honda CD 70", user: "Ali Raza", rating: 5, comment: "Best budget bike in Pakistan. Never fails.", date: "Jun 1, 2024", status: "approved" },
  { id: 2, bike: "Honda CB 150F", user: "Sara Ahmed", rating: 4, comment: "Sporty looks, comfortable for city rides. Fuel average could be better.", date: "May 28, 2024", status: "approved" },
  { id: 3, bike: "Yamaha YBR 125G", user: "Imran Khan", rating: 3, comment: "Overpriced for what it offers. Decent build quality.", date: "May 25, 2024", status: "pending" },
  { id: 4, bike: "Suzuki GR 150", user: "Zara Malik", rating: 5, comment: "Absolutely love the ride quality. Handles highway beautifully.", date: "May 20, 2024", status: "approved" },
  { id: 5, bike: "Honda CG 125", user: "Hassan Siddiqui", rating: 4, comment: "Classic workhorse. Spare parts are everywhere. Highly recommended.", date: "May 18, 2024", status: "approved" },
  { id: 6, bike: "United US 70", user: "Nadia Iqbal", rating: 2, comment: "Cheap but the build feels flimsy compared to Honda.", date: "May 15, 2024", status: "pending" },
  { id: 7, bike: "Yamaha YBZ 125", user: "Usman Tariq", rating: 1, comment: "Had issues within the first month. Poor after-sales support.", date: "May 10, 2024", status: "flagged" },
  { id: 8, bike: "Ravi Storm 100", user: "Farhan K.", rating: 4, comment: "Surprisingly reliable. Great for short commutes on a tight budget.", date: "May 5, 2024", status: "approved" },
];

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`material-symbols-outlined text-[16px] ${s <= rating ? "text-yellow-500" : "text-outline/40"}`}
        style={{ fontVariationSettings: s <= rating ? "'FILL' 1" : "'FILL' 0" }}
      >
        star
      </span>
    ))}
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    approved: "bg-secondary/10 text-secondary",
    pending: "bg-yellow-100 text-yellow-700",
    flagged: "bg-error/10 text-error",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full font-label-sm text-label-sm capitalize ${map[status] ?? ""}`}>
      {status}
    </span>
  );
};

const ROWS_PER_PAGE = 5;

const AdminReviews = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = reviews.filter((r) => {
    const matchSearch =
      r.bike.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleApprove = (id) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
  const handleDelete = (id) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Reviews</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Moderate user reviews across all bikes
        </p>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: reviews.length, icon: "reviews", color: "text-primary", bg: "bg-primary/10", filter: "all" },
          { label: "Approved", value: reviews.filter((r) => r.status === "approved").length, icon: "check_circle", color: "text-secondary", bg: "bg-secondary/10", filter: "approved" },
          { label: "Pending", value: reviews.filter((r) => r.status === "pending").length, icon: "pending", color: "text-yellow-600", bg: "bg-yellow-100", filter: "pending" },
          { label: "Flagged", value: reviews.filter((r) => r.status === "flagged").length, icon: "flag", color: "text-error", bg: "bg-error/10", filter: "flagged" },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => { setFilter(s.filter); setPage(1); }}
            className={`bg-surface-container-lowest rounded-xl border p-4 flex items-center gap-3 transition-all text-left ${
              filter === s.filter ? "border-primary" : "border-black/10 hover:border-primary/30"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.bg}`}>
              <span className={`material-symbols-outlined text-[22px] ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-surface-container-lowest rounded-xl border border-black/10 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-black/10">
          <div className="relative max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-surface-container border border-black/10 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-black/10">
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Bike</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">User</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Rating</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Comment</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Date</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-on-surface-variant font-body-md text-body-md">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                pageRows.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">two_wheeler</span>
                        <span className="font-medium text-on-surface text-sm">{r.bike}</span>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm hidden sm:table-cell">{r.user}</td>
                    <td className="p-4"><Stars rating={r.rating} /></td>
                    <td className="p-4 hidden lg:table-cell">
                      <p className="text-on-surface-variant text-sm max-w-xs truncate">{r.comment}</p>
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm hidden md:table-cell">{r.date}</td>
                    <td className="p-4"><StatusBadge status={r.status} /></td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => handleApprove(r.id)}
                            className="p-1.5 text-on-surface-variant hover:text-secondary transition-colors rounded-md hover:bg-secondary/10"
                            title="Approve"
                          >
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-md hover:bg-error/10"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-black/10 bg-surface-container-low flex justify-between items-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Showing {filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1} to {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded border border-black/10 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button key={pg} onClick={() => setPage(pg)} className={`w-8 h-8 flex items-center justify-center rounded border font-label-sm text-label-sm transition-colors ${page === pg ? "border-primary bg-primary text-on-primary" : "border-black/10 bg-surface-container-lowest text-on-surface hover:bg-surface-variant"}`}>
                {pg}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="w-8 h-8 flex items-center justify-center rounded border border-black/10 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
