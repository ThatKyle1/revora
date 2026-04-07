import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

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
        <div className="mb-4">
          <a
            href="/dashboard/new"
            className="bg-black text-white rounded px-4 py-2 text-sm hover:bg-gray-800"
          >
            New Listing
          </a>
        </div>
        <div className="border rounded-lg p-12 text-center text-gray-400">
          No listings yet. Create your first listing to get started.
        </div>
      </div>
    </main>
  );
}
