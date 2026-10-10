"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const { lang } = useLanguage();

  if (isPending) return <div className="text-center py-20">Loading...</div>;
  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {lang === "en" ? "My Profile" : "আমার প্রোফাইল"}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{session.user.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{session.user.email}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link 
            href="/profile/update"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {lang === "en" ? "Update Information" : "তথ্য হালনাগাদ করুন"}
          </Link>
        </div>
      </div>
    </div>
  );
}
