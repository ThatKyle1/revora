"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  async function handleGenerate() {
    setGenerating(true);
    setGenerateError(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, size, condition, notes }),
    });

    if (res.ok) { // if call went by fine set
      const data = await res.json();
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setTags(data.tags ?? "");
    } else if (res.status === 401) { // if not raise the error that matches what went wrong
      setGenerateError("Your session has expired. Please sign in again.");
    } else {
      setGenerateError("The AI couldn't generate a listing right now. Please try again.");
    }

    setGenerating(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // getting all form data inputed
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/listings", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard");
    } else if (res.status === 401) {
      setSubmitError("Your session has expired. Please sign in again.");
      setLoading(false);
    } else {
      setSubmitError("Something went wrong saving your listing. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3">
        <a
          href="/dashboard"
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Back
        </a>
        <span className="w-px h-4 bg-gray-200 shrink-0" aria-hidden="true" />
        <span className="text-base font-bold tracking-tight text-gray-900">Revora</span>
      </nav>

      <main className="flex-1 max-w-xl w-full mx-auto px-6 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-8">New Listing</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Section: Item Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-900">Item Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                name="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={inputClass}
                placeholder="e.g. Nike, Zara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                name="size"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={inputClass}
                placeholder="e.g. M, 32, 10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className={inputClass}
              >
                <option value="">Select condition</option>
                <option value="new_with_tags">New with tags</option>
                <option value="like_new">Like new</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="Any details — color, style, flaws, etc."
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {generating ? "Generating…" : "Generate listing with AI"}
            </button>

            {generateError && (
              <p className="text-sm text-red-600" role="alert">{generateError}</p>
            )}
          </div>

          {/* Section: Generated listing (shown after generate) */}
          {title && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Your Listing</h2>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-medium px-2 py-0.5 rounded-full">
                  AI generated
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  name="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Section: Pricing & Photo */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-900">Pricing &amp; Photo</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase price ($)
              </label>
              <input
                name="purchasePrice"
                type="number"
                step="0.01"
                className={inputClass}
                placeholder="0.00"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Used to calculate your estimated profit after fees and shipping.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
              />
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-red-600 -mt-2" role="alert">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving…" : "Save listing"}
          </button>
        </form>
      </main>
    </div>
  );
}
