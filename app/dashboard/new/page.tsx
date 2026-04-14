"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  async function handleGenerate() {
    setGenerating(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, size, condition, notes }),
    });

    if (res.ok) {
      const data = await res.json();
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setTags(data.tags ?? "");
    } else {
      alert("Generation failed. Please try again.");
    }

    setGenerating(false);
  }

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
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Nike, Zara"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              name="size"
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. M, 32, 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Any details about the item..."
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate with AI"}
          </button>
          {title && (
            <div className="flex flex-col gap-4 border rounded-lg p-4 bg-gray-50 text-black">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  name="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-white"
                />
              </div>
            </div>
          )}
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
