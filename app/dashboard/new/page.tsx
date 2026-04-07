"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/listings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">New Listing</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              name="brand"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Nike, Zara"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              name="size"
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. M, 32, 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select name="condition" className="w-full border rounded px-3 py-2">
              <option value="">Select condition</option>
              <option value="new_with_tags">New with tags</option>
              <option value="like_new">Like new</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Any details about the item..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Purchase Price ($)
            </label>
            <input
              name="purchasePrice"
              type="number"
              step="0.01"
              className="w-full border rounded px-3 py-2"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Listing"}
          </button>
        </form>
      </div>
    </main>
  );
}
