"use client";

import { useAuth } from "@/lib/AuthContext";
import { signOutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <h1 className="text-2xl font-bold text-stone-900">My Profile</h1>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "User"}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-700">
              {user.displayName?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}

          <div>
            <p className="font-semibold text-stone-900 text-lg">{user.displayName}</p>
            <p className="text-stone-500 text-sm">{user.email}</p>
            {user.emailVerified && (
              <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-stone-100" />

        {/* Sign out */}
        <button
          onClick={async () => {
            await signOutUser();
            router.push("/");
          }}
          className="w-full border border-stone-200 text-stone-600 text-sm font-medium py-2.5 rounded-xl hover:bg-stone-50 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}