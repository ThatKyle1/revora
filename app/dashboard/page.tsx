import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Revora</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user?.name}</span>
            <a
              href="/api/auth/signout"
              className="text-sm text-red-500 hover:underline"
            >
              Sign out
            </a>
          </div>
        </div>
        <div className="mb-6">
          <a
            href="/dashboard/new"
            className="bg-black text-white rounded px-4 py-2 text-sm hover:bg-gray-800"
          >
            New Listing
          </a>
        </div>
        {listings.length === 0 ? (
          <div className="border rounded-lg p-12 text-center text-gray-400">
            No listings yet. Create your first listing to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div key={listing.id} className="border rounded-lg p-4 flex gap-4">
                {listing.imageUrl && (
                  <Image
                    src={listing.imageUrl}
                    alt={listing.brand ?? "listing"}
                    width={80}
                    height={80}
                    className="rounded object-cover w-20 h-20 shrink-0"
                  />
                )}
                <div>
                  <p className="font-medium">{listing.brand ?? "No brand"}</p>
                  <p className="text-sm text-gray-500">
                    {listing.size} · {listing.condition}
                  </p>
                  {listing.purchasePrice && (
                    <p className="text-sm text-gray-500">
                      Paid: ${listing.purchasePrice}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
