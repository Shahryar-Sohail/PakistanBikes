import { useState } from "react";

/* Mock users data */
const MOCK_USERS = [
  { id: 1, name: "Farhan K.", email: "farhan@pkbikes.pk", joined: "Jan 12, 2024", role: "Admin", status: "active", bikes: 12 },
  { id: 2, name: "Ali Raza", email: "ali.raza@gmail.com", joined: "Feb 3, 2024", role: "User", status: "active", bikes: 3 },
  { id: 3, name: "Sara Ahmed", email: "sara.ahmed@outlook.com", joined: "Mar 17, 2024", role: "User", status: "active", bikes: 7 },
  { id: 4, name: "Imran Khan", email: "imran.khan@yahoo.com", joined: "Apr 5, 2024", role: "User", status: "suspended", bikes: 1 },
  { id: 5, name: "Zara Malik", email: "zara.malik@gmail.com", joined: "Apr 22, 2024", role: "User", status: "active", bikes: 5 },
  { id: 6, name: "Hassan Siddiqui", email: "hassan.s@live.com", joined: "May 8, 2024", role: "Moderator", status: "active", bikes: 9 },
  { id: 7, name: "Nadia Iqbal", email: "nadia.iqbal@gmail.com", joined: "May 19, 2024", role: "User", status: "active", bikes: 2 },
  { id: 8, name: "Usman Tariq", email: "usman.tariq@hotmail.com", joined: "Jun 1, 2024", role: "User", status: "suspended", bikes: 0 },
];

const RoleBadge = ({ role }) => {
  const map = {
    Admin: "bg-primary/10 text-primary",
    Moderator: "bg-tertiary/10 text-tertiary",
    User: "bg-surface-container text-on-surface-variant",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full font-label-sm text-label-sm ${map[role] ?? map["User"]}`}>
      {role}
    </span>
  );
};

const StatusDot = ({ status }) =>
  status === "active" ? (
    <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary">
      <span className="w-2 h-2 rounded-full bg-secondary" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-error">
      <span className="w-2 h-2 rounded-full bg-error" /> Suspended
    </span>
  );

const ROWS_PER_PAGE = 6;

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Users</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {MOCK_USERS.length} registered users
          </p>
        </div>
        <button className="bg-primary hover:bg-surface-tint text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Invite User
        </button>
      </div>

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: MOCK_USERS.length, icon: "group", color: "text-primary", bg: "bg-primary/10" },
          { label: "Active", value: MOCK_USERS.filter((u) => u.status === "active").length, icon: "check_circle", color: "text-secondary", bg: "bg-secondary/10" },
          { label: "Suspended", value: MOCK_USERS.filter((u) => u.status === "suspended").length, icon: "block", color: "text-error", bg: "bg-error/10" },
          { label: "Admins", value: MOCK_USERS.filter((u) => u.role === "Admin").length, icon: "admin_panel_settings", color: "text-tertiary", bg: "bg-tertiary/10" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl border border-black/10 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.bg}`}>
              <span className={`material-symbols-outlined text-[22px] ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="font-headline-md text-headline-md text-on-surface">{s.value}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-surface-container-lowest rounded-xl border border-black/10 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-black/10">
          <div className="relative max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search users..."
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
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">User</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Joined</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Role</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Status</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Bikes Saved</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {pageRows.map((user) => {
                const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                const hue = (user.id * 53) % 360;
                return (
                  <tr key={user.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-label-md text-label-md shrink-0"
                          style={{ backgroundColor: `hsl(${hue}, 55%, 42%)` }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{user.name}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm hidden md:table-cell">{user.joined}</td>
                    <td className="p-4"><RoleBadge role={user.role} /></td>
                    <td className="p-4 hidden sm:table-cell"><StatusDot status={user.status} /></td>
                    <td className="p-4 text-on-surface-variant hidden lg:table-cell">{user.bikes}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-primary/10">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-md hover:bg-error/10">
                          <span className="material-symbols-outlined text-[20px]">block</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-black/10 bg-surface-container-low flex justify-between items-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Showing {(page - 1) * ROWS_PER_PAGE + 1} to {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
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

export default AdminUsers;
