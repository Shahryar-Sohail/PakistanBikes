import { useState } from "react";
import { bikes as initialBikes } from "../../../data/bikes";
import AddBikeModal from "./AddBikeModal";

const StatusBadge = ({ status }) =>
  status === "active" ? (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-secondary/10 text-secondary rounded-full font-label-sm text-label-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant" />
      Draft
    </span>
  );

const ROWS_PER_PAGE = 5;

const AdminBikes = () => {
  const [bikeList, setBikeList] = useState(initialBikes);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* Filtered */
  const filtered = bikeList.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.brand.toLowerCase().includes(search.toLowerCase()) ||
      b.model.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  /* Add bike */
  const handleSave = (formData) => {
    const newBike = {
      id: Date.now(),
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      cc: Number(formData.cc),
      price: Number(formData.price),
      year: Number(formData.year),
      type: formData.type,
      fuelAvg: formData.fuelAvg,
      description: formData.description,
      colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
      image: formData.imagePreview || null,
      specs: formData.specs,
      rating: 0,
      reviews: 0,
    };
    setBikeList((prev) => [newBike, ...prev]);
    setShowModal(false);
    setPage(1);
  };

  /* Delete */
  const handleDelete = (id) => {
    setBikeList((prev) => prev.filter((b) => b.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Bike Inventory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {bikeList.length} bikes in the database
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-surface-tint text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Bike
        </button>
      </div>

      {/* Table card */}
      <div className="bg-surface-container-lowest rounded-xl border border-black/10 overflow-hidden">
        {/* Search */}
        <div className="p-4 md:p-6 border-b border-black/10 flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search bikes..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-surface-container border border-black/10 rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-black/10">
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Model</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Brand</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Engine</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Price (PKR)</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-on-surface-variant font-body-md text-body-md">
                    No bikes match your search.
                  </td>
                </tr>
              ) : (
                pageRows.map((bike) => (
                  <tr key={bike.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container border border-black/5 flex items-center justify-center shrink-0 overflow-hidden">
                          {bike.image ? (
                            <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">two_wheeler</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{bike.model}</p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">{bike.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant hidden sm:table-cell">{bike.brand}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 bg-[#1c1c1e] text-white rounded-full font-label-sm text-label-sm">
                        {bike.cc}cc
                      </span>
                    </td>
                    <td className="p-4 text-on-surface hidden md:table-cell">
                      {Number(bike.price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={bike.id % 3 === 0 ? "draft" : "active"} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-primary/10">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteId(bike.id)}
                          className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-md hover:bg-error/10"
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

        {/* Pagination */}
        <div className="p-4 border-t border-black/10 bg-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Showing {filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1} to{" "}
            {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-black/10 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`w-8 h-8 flex items-center justify-center rounded border font-label-sm text-label-sm transition-colors ${
                  page === pg
                    ? "border-primary bg-primary text-on-primary"
                    : "border-black/10 bg-surface-container-lowest text-on-surface hover:bg-surface-variant"
                }`}
              >
                {pg}
              </button>
            ))}
            {totalPages > 5 && <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">…</span>}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-black/10 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Bike Modal */}
      {showModal && <AddBikeModal onClose={() => setShowModal(false)} onSave={handleSave} />}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative z-10 bg-surface-container-lowest rounded-xl border border-black/10 shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-error text-[22px]">delete</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Delete Bike</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-black/10 font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 rounded-lg bg-error hover:bg-error/90 text-on-error font-label-md text-label-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBikes;
