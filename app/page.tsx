import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Revora</h1>
        <p className="text-gray-500 mb-8">
          AI-powered listing generator for clothing resellers. Create better
          listings in seconds.
        </p>
        <a
          href="/api/auth/signin"
          className="bg-black text-white rounded px-6 py-3 text-sm hover:bg-gray-800"
        >
          Sign in with GitHub
        </a>
      </div>
    </main>
  );
}
