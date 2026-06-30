import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import DeleteButton from "./DeleteButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-base font-bold tracking-tight">Revora</span>
        <div className="flex items-center gap-5">
          <span className="text-sm text-gray-500">{session.user?.name}</span>
          <a
            href="/api/auth/signout"
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            Sign out
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {listings.length} {listings.length === 1 ? "item" : "items"}
            </p>
          </div>
          <a
            href="/dashboard/new"
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            + New listing
          </a>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
            <p className="text-2xl mb-2">📦</p>
            <p className="font-semibold text-gray-700 mb-1">No listings yet</p>
            <p className="text-sm text-gray-400 mb-6">
              Create your first listing and let AI do the writing.
            </p>
            <a
              href="/dashboard/new"
              className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create your first listing
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 hover:shadow-sm transition-shadow"
              >
                {listing.imageUrl ? (
                  <Image
                    src={listing.imageUrl}
                    alt={listing.brand ?? "listing"}
                    width={96}
                    height={96}
                    className="rounded-xl object-cover w-24 h-24 shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300 text-2xl">
                    📷
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {listing.title ?? listing.brand ?? "Untitled"}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {[listing.size, listing.condition].filter(Boolean).join(" · ")}
                  </p>
                  {listing.purchasePrice && (
                    <p className="text-sm text-gray-400 mt-0.5">
                      Paid ${listing.purchasePrice}
                    </p>
                  )}
                  {listing.estimatedProfit !== null && (
                    <p className="text-sm font-semibold text-emerald-600 mt-1">
                      Est. profit ${listing.estimatedProfit}
                    </p>
                  )}
                  <div className="mt-3">
                    <DeleteButton id={listing.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
