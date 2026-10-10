"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (isPending) return <div className="text-center py-20">Loading...</div>;
  if (!session) {
    router.push("/signin");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {lang === "en" ? "Update Information" : "নাম হালনাগাদ করুন"}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {lang === "en" ? "Name" : "নাম"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading 
              ? (lang === "en" ? "Updating..." : "হালনাগাদ হচ্ছে...") 
              : (lang === "en" ? "Update Information" : "নাম হালনাগাদ করুন")
            }
          </button>
        </form>
      </div>
    </div>
  );
}
