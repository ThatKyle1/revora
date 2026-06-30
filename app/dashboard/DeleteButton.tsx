"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this listing?")) return;

    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
    >
      Delete
    </button>
  );
}
