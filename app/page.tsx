import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-lg font-bold tracking-tight text-gray-900">Revora</span>
        <a
          href="/api/auth/signin"
          className="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Sign in
        </a>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-bold tracking-tight leading-tight mb-5 max-w-2xl">
          Better listings,<br />faster.
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">
          Describe your item. Revora writes the title, description, and tags —
          and tells you exactly how much profit to expect.
        </p>
        <a
          href="/api/auth/signin"
          className="bg-black text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Get started free
        </a>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">AI-generated listings</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Enter brand, size, and condition. Get a polished title,
              description, and relevant tags in seconds.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.5v9M14.5 9.8c0-1-.9-1.6-2.3-1.6-1.5 0-2.6.8-2.6 1.9 0 2.7 5.2 1.3 5.2 4 0 1.2-1.2 2-2.6 2-1.5 0-2.5-.6-2.6-1.8" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Profit calculator</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Enter what you paid. Revora factors in platform fees and shipping
              to show your estimated profit upfront.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" />
                <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" />
                <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" />
                <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm">Listings dashboard</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              All your items in one place. See profit at a glance, add photos,
              and manage your inventory.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
