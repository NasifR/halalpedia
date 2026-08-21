"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Restaurant } from "@/data/restaurants";
import { uploadImage } from "@/lib/uploadImage";

export type FormData = Omit<Restaurant, "id">;

const EMPTY_FORM: FormData = {
  name: "",
  borough: "Manhattan",
  cuisine: "",
  priceRange: "$",
  zabihaStatus: "unknown",
  address: "",
  description: "",
  image: "",
  phone: "",
  hours: "",
  featured: false,
  menu: "",
};

interface RestaurantFormProps {
  initial?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

type ImageField = "image" | "menu";
type InputMode = "upload" | "link";

export default function RestaurantForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel,
}: RestaurantFormProps) {
  const [form, setForm] = useState<FormData>(initial ?? EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  // Per-image input mode (upload vs link)
  const [imageMode, setImageMode] = useState<Record<ImageField, InputMode>>({
    image: "upload",
    menu: "upload",
  });
  const [uploading, setUploading] = useState<Record<ImageField, boolean>>({
    image: false,
    menu: false,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const menuInputRef = useRef<HTMLInputElement>(null);

  function set(key: keyof FormData, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  async function handleImageUpload(field: ImageField, file: File) {
    const folder = field === "image" ? "restaurants" : "menus";
    setUploading((prev) => ({ ...prev, [field]: true }));
    try {
      const url = await uploadImage(file, folder);
      set(field, url);
    } catch {
      setError(`Failed to upload ${field === "image" ? "cover photo" : "menu"}. Try again.`);
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  }

  async function handleSubmit() {
    if (!form.name.trim()) { setError("Restaurant name is required."); return; }
    if (!form.address.trim()) { setError("Address is required."); return; }
    if (!form.cuisine.trim()) { setError("Cuisine is required."); return; }

    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (dirty && !confirm("You have unsaved changes. Leave anyway?")) return;
    onCancel();
  }

  const INPUT = "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500";
  const SELECT = `${INPUT} appearance-none cursor-pointer`;
  const LABEL = "block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1";

  return (
    <div className="space-y-8">
      {/* ── Basic info ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h3 className="font-semibold text-stone-800 border-b border-stone-100 pb-2">Basic Info</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className={LABEL}>Restaurant Name *</label>
            <input
              type="text"
              placeholder="e.g. Al Aqsa Halal"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Borough */}
          <div>
            <label className={LABEL}>Borough *</label>
            <div className="relative">
              <select
                value={form.borough}
                onChange={(e) => set("borough", e.target.value)}
                className={SELECT}
              >
                {["Manhattan", "Queens", "Brooklyn", "Bronx", "Staten Island"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▾</span>
            </div>
          </div>

          {/* Cuisine */}
          <div>
            <label className={LABEL}>Cuisine *</label>
            <input
              type="text"
              placeholder="e.g. Middle Eastern, Desi, Turkish"
              value={form.cuisine}
              onChange={(e) => set("cuisine", e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Price range */}
          <div>
            <label className={LABEL}>Price Range *</label>
            <div className="flex gap-2">
              {(["$", "$$", "$$$"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("priceRange", p)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                    form.priceRange === p
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Zabiha status */}
          <div>
            <label className={LABEL}>Zabiha Status *</label>
            <div className="flex gap-2">
              {(["yes", "unknown"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("zabihaStatus", s)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                    form.zabihaStatus === s
                      ? s === "yes"
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "bg-amber-500 text-white border-amber-500"
                      : "border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {s === "yes" ? "✓ Zabiha" : "? Unverified"}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className={LABEL}>Address *</label>
            <input
              type="text"
              placeholder="e.g. 4702 Church Ave, Brooklyn, NY 11203"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={LABEL}>Phone</label>
            <input
              type="text"
              placeholder="(718) 555-0101"
              value={form.phone ?? ""}
              onChange={(e) => set("phone", e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Hours */}
          <div>
            <label className={LABEL}>Hours</label>
            <input
              type="text"
              placeholder="Mon–Sun: 10am – 11pm"
              value={form.hours ?? ""}
              onChange={(e) => set("hours", e.target.value)}
              className={INPUT}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={LABEL}>Description</label>
            <textarea
              rows={3}
              placeholder="Brief description of the restaurant, what they're known for, verification notes..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${INPUT} resize-none`}
            />
          </div>

          {/* Featured toggle */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => set("featured", !form.featured)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  form.featured ? "bg-emerald-600" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.featured ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-stone-700">
                Featured on homepage
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* ── Images ─────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h3 className="font-semibold text-stone-800 border-b border-stone-100 pb-2">Images</h3>

        {(["image", "menu"] as ImageField[]).map((field) => {
          const isMenu = field === "menu";
          const label = isMenu ? "Menu Photo" : "Cover Photo";
          const hint = isMenu
            ? "Recommended: clear photo of full menu. Any size."
            : "Recommended: 1200×800px landscape, well-lit food or storefront.";
          const inputRef = isMenu ? menuInputRef : imageInputRef;

          return (
            <div key={field} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className={LABEL}>{label}</label>
                  <p className="text-xs text-stone-400">{hint}</p>
                </div>

                {/* Upload / Link toggle */}
                <div className="flex rounded-lg border border-stone-200 overflow-hidden text-xs font-medium">
                  {(["upload", "link"] as InputMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() =>
                        setImageMode((prev) => ({ ...prev, [field]: mode }))
                      }
                      className={`px-3 py-1.5 transition-colors capitalize ${
                        imageMode[field] === mode
                          ? "bg-emerald-700 text-white"
                          : "text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      {mode === "upload" ? "⬆ Upload" : "🔗 Link"}
                    </button>
                  ))}
                </div>
              </div>

              {imageMode[field] === "upload" ? (
                <div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(field, file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading[field]}
                    className="w-full border-2 border-dashed border-stone-200 rounded-xl py-8 text-center text-stone-400 hover:border-emerald-400 hover:text-emerald-600 transition-colors disabled:opacity-50"
                  >
                    {uploading[field] ? (
                      <span>Uploading...</span>
                    ) : (
                      <span>
                        <span className="text-2xl block mb-1">📁</span>
                        Click to upload {label.toLowerCase()}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <input
                  type="url"
                  placeholder="https://..."
                  value={form[field] ?? ""}
                  onChange={(e) => set(field, e.target.value)}
                  className={INPUT}
                />
              )}

              {/* Preview */}
              {form[field] && (
                <div className="relative h-40 w-full rounded-xl overflow-hidden border border-stone-100">
                  <Image
                    src={form[field] as string}
                    alt={label}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => set(field, "")}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ── Error + actions ─────────────────────────────────────────────── */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </div>
  );
}