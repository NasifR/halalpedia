"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminGuard from "@/components/AdminGuard";
import RestaurantForm, { FormData } from "@/components/admin/RestaurantForm";
import {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "@/lib/adminRestaurants";
import { Restaurant } from "@/data/restaurants";

type Panel = "list" | "add" | "edit";

const ZABIHA_STYLE = {
  yes: "bg-emerald-100 text-emerald-700",
  unknown: "bg-amber-100 text-amber-700",
};

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState<Panel>("list");
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await getAllRestaurants();
    // Sort alphabetically
    data.sort((a, b) => a.name.localeCompare(b.name));
    setRestaurants(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(data: FormData) {
    await addRestaurant(data);
    await load();
    setPanel("list");
  }

  async function handleEdit(data: FormData) {
    if (!editing) return;
    await updateRestaurant(editing.id, data);
    await load();
    setPanel("list");
    setEditing(null);
  }

  async function handleDelete(id: string) {
    await deleteRestaurant(id);
    setConfirmDelete(null);
    await load();
  }

  async function toggleFeatured(r: Restaurant) {
    await updateRestaurant(r.id, { featured: !r.featured });
    await load();
  }

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.borough.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Admin Panel</h1>
            <p className="text-stone-500 text-sm mt-0.5">
              {restaurants.length} restaurants in database
            </p>
          </div>

          {panel === "list" && (
            <button
              onClick={() => setPanel("add")}
              className="bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors shadow-sm"
            >
              + Add Restaurant
            </button>
          )}

          {panel !== "list" && (
            <button
              onClick={() => { setPanel("list"); setEditing(null); }}
              className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              ← Back to list
            </button>
          )}
        </div>

        {/* ── Add form ────────────────────────────────────────────────── */}
        {panel === "add" && (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-6">Add New Restaurant</h2>
            <RestaurantForm
              onSubmit={handleAdd}
              onCancel={() => setPanel("list")}
              submitLabel="Add Restaurant"
            />
          </div>
        )}

        {/* ── Edit form ───────────────────────────────────────────────── */}
        {panel === "edit" && editing && (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-6">
              Editing: {editing.name}
            </h2>
            <RestaurantForm
              initial={editing}
              onSubmit={handleEdit}
              onCancel={() => { setPanel("list"); setEditing(null); }}
              submitLabel="Save Changes"
            />
          </div>
        )}

        {/* ── Restaurant list ──────────────────────────────────────────── */}
        {panel === "list" && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
              <input
                type="text"
                placeholder="Search by name, borough, or cuisine..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-white pl-10 pr-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {loading ? (
              <div className="text-center py-16 text-stone-400">Loading restaurants...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-stone-400">No restaurants found.</div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50 text-left text-xs font-semibold uppercase tracking-wider text-stone-400">
                      <th className="px-4 py-3">Restaurant</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Borough</th>
                      <th className="px-4 py-3 hidden md:table-cell">Cuisine</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Zabiha</th>
                      <th className="px-4 py-3 hidden md:table-cell">Featured</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {filtered.map((r) => (
                      <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                        {/* Name + image */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {r.image && (
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                                <Image src={r.image} alt={r.name} fill className="object-cover" />
                              </div>
                            )}
                            <span className="font-medium text-stone-900 line-clamp-1">{r.name}</span>
                          </div>
                        </td>

                        {/* Borough */}
                        <td className="px-4 py-3 text-stone-500 hidden sm:table-cell">
                          {r.borough}
                        </td>

                        {/* Cuisine */}
                        <td className="px-4 py-3 text-stone-500 hidden md:table-cell">
                          {r.cuisine}
                        </td>

                        {/* Zabiha badge */}
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${ZABIHA_STYLE[r.zabihaStatus]}`}>
                            {r.zabihaStatus === "yes" ? "✓ Zabiha" : "? Unverified"}
                          </span>
                        </td>

                        {/* Featured toggle */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <button
                            onClick={() => toggleFeatured(r)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                              r.featured
                                ? "bg-emerald-100 text-emerald-700 hover:bg-red-100 hover:text-red-600"
                                : "bg-stone-100 text-stone-500 hover:bg-emerald-100 hover:text-emerald-700"
                            }`}
                            title={r.featured ? "Click to unfeature" : "Click to feature"}
                          >
                            {r.featured ? "★ Featured" : "☆ Feature"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/restaurant/${r.id}`}
                              target="_blank"
                              className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => { setEditing(r); setPanel("edit"); }}
                              className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setConfirmDelete(r.id)}
                              className="text-xs px-3 py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Delete confirmation modal ──────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-4 space-y-4">
            <h3 className="font-bold text-stone-900 text-lg">Delete restaurant?</h3>
            <p className="text-stone-500 text-sm">
              This will permanently remove the restaurant from the database. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-xl border border-stone-200 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}