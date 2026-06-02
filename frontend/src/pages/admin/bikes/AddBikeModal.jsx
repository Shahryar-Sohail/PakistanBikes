import { useState, useRef } from "react";

const BIKE_TYPES = ["commuter", "sport-commuter", "sport", "cruiser", "off-road"];
const BRANDS = ["Honda", "Yamaha", "Suzuki", "United", "Ravi", "Road Prince", "Sohrab", "Other"];

const EMPTY_FORM = {
  name: "",
  brand: "Honda",
  model: "",
  cc: "",
  price: "",
  year: new Date().getFullYear(),
  type: "commuter",
  fuelAvg: "",
  description: "",
  colors: "",
  image: null,
  imagePreview: null,
  specs: {
    engine: "",
    topSpeed: "",
    power: "",
    torque: "",
    transmission: "",
    fuelCapacity: "",
    weight: "",
    mileage: "",
  },
};

/* ── Small field wrapper ── */
const Field = ({ label, children, required }) => (
  <div>
    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
      {label}
      {required && <span className="text-primary ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = `
  w-full px-3 py-2.5
  bg-surface-container border border-black/10 rounded-lg
  font-body-md text-body-md text-on-surface
  placeholder:text-on-surface-variant
  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
  transition-all
`;

const AddBikeModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const setSpec = (field, value) =>
    setForm((f) => ({ ...f, specs: { ...f.specs, [field]: value } }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, image: file, imagePreview: preview }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save delay
    await new Promise((r) => setTimeout(r, 800));
    onSave(form);
    setSaving(false);
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-2xl h-full bg-surface-container-lowest shadow-2xl flex flex-col overflow-hidden animate-[slideIn_0.3s_ease-out]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Add New Bike</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
              Fill in the details below to add a bike to the inventory.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* ── Image Upload ── */}
          <section>
            <p className="font-label-md text-label-md text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">image</span>
              Bike Image
            </p>
            <div
              className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${
                form.imagePreview ? "border-primary/40" : "border-outline-variant/50 hover:border-primary/40"
              }`}
              style={{ minHeight: "180px" }}
              onClick={() => fileRef.current?.click()}
            >
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-44 gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[40px] text-outline">add_photo_alternate</span>
                  <p className="font-label-md text-label-md">Click to upload image</p>
                  <p className="font-label-sm text-label-sm">PNG, JPG up to 5MB</p>
                </div>
              )}
              {form.imagePreview && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); set("image", null); set("imagePreview", null); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </section>

          {/* ── Basic Info ── */}
          <section>
            <p className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">info</span>
              Basic Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Brand" required>
                <select
                  value={form.brand}
                  onChange={(e) => set("brand", e.target.value)}
                  className={inputCls}
                  required
                >
                  {BRANDS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>

              <Field label="Model Name" required>
                <input
                  type="text"
                  placeholder="e.g. CD 70"
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Display Name" required>
                <input
                  type="text"
                  placeholder="e.g. Honda CD 70"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Year" required>
                <input
                  type="number"
                  placeholder="2024"
                  value={form.year}
                  onChange={(e) => set("year", e.target.value)}
                  className={inputCls}
                  min="2000"
                  max="2030"
                  required
                />
              </Field>

              <Field label="Engine CC" required>
                <input
                  type="number"
                  placeholder="125"
                  value={form.cc}
                  onChange={(e) => set("cc", e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Price (PKR)" required>
                <input
                  type="number"
                  placeholder="265000"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={inputCls}
                  required
                />
              </Field>

              <Field label="Type" required>
                <select
                  value={form.type}
                  onChange={(e) => set("type", e.target.value)}
                  className={inputCls}
                >
                  {BIKE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Fuel Average">
                <input
                  type="text"
                  placeholder="45+ km/l"
                  value={form.fuelAvg}
                  onChange={(e) => set("fuelAvg", e.target.value)}
                  className={inputCls}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Colors (comma-separated)">
                  <input
                    type="text"
                    placeholder="Red, Black, Blue"
                    value={form.colors}
                    onChange={(e) => set("colors", e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Description">
                  <textarea
                    rows={3}
                    placeholder="Brief description of this bike..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    className={inputCls + " resize-none"}
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* ── Technical Specs ── */}
          <section>
            <p className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">settings</span>
              Technical Specifications
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "engine", label: "Engine", placeholder: "149.16cc 4-stroke SOHC" },
                { key: "topSpeed", label: "Top Speed", placeholder: "120 KM/H" },
                { key: "power", label: "Power", placeholder: "13.5 bhp" },
                { key: "torque", label: "Torque", placeholder: "12.8 Nm" },
                { key: "transmission", label: "Transmission", placeholder: "5-speed" },
                { key: "fuelCapacity", label: "Fuel Capacity", placeholder: "12L" },
                { key: "weight", label: "Weight", placeholder: "124 kg" },
                { key: "mileage", label: "Mileage", placeholder: "35 km/l" },
              ].map(({ key, label, placeholder }) => (
                <Field key={key} label={label}>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form.specs[key]}
                    onChange={(e) => setSpec(key, e.target.value)}
                    className={inputCls}
                  />
                </Field>
              ))}
            </div>
          </section>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-black/10 bg-surface-container-low flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-black/10 font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-surface-tint text-on-primary font-label-md text-label-md flex items-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                Saving…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">check</span>
                Save Bike
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBikeModal;
