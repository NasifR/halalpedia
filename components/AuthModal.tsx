"use client";

import { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Image from "next/image";

import { auth, signInWithGoogle, signOutUser } from "@/lib/auth";
import { useAuth } from "@/lib/AuthContext";

interface AuthModalProps {
  onClose: () => void;
}

type View = "login" | "signup";

export default function AuthModal({ onClose }: AuthModalProps) {
  const { user, isAdmin } = useAuth();

  const overlayRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<View>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Close modal when Escape is pressed
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  }

  function switchView(nextView: View) {
    clearForm();
    setView(nextView);
  }

  // Convert Firebase error codes into user-friendly messages
  function parseError(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password. Try again.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      default:
        return "Something went wrong. Please try again.";
    }
  }

  async function handleSignup() {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      onClose();
    } catch (err: any) {
      setError(parseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err: any) {
      setError(parseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(parseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex min-h-screen w-screen items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="relative mx-4 w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-xl leading-none text-stone-400 hover:text-stone-600"
          aria-label="Close"
        >
          ✕
        </button>

        {user ? (
          /* Logged-in view */
          <div className="space-y-5 text-center">

            <div>
              <p className="font-semibold text-stone-900">
                {user.displayName}
              </p>

              <p className="text-sm text-stone-500">{user.email}</p>

              {isAdmin && (
                <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Admin
                </span>
              )}
            </div>

            {isAdmin && (
              <a
                href="/admin"
                className="block w-full rounded-xl bg-emerald-700 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
              >
                Go to Admin Panel
              </a>
            )}

            <button
              type="button"
              onClick={async () => {
                await signOutUser();
                onClose();
              }}
              className="w-full rounded-xl border border-stone-200 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
            >
              Sign out
            </button>
          </div>
        ) : (
          /* Login / signup view */
          <div className="space-y-5">
            {/* Header */}
            <div className="space-y-1 text-center">
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt="Halalpedia"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              <h2 className="text-xl font-bold text-stone-900">
                {view === "login"
                  ? "Welcome back"
                  : "Create an account"}
              </h2>

              <p className="text-sm text-stone-500">
                {view === "login"
                  ? "Sign in to your Halalpedia account"
                  : "Join the Halalpedia community"}
              </p>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 py-3 font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 disabled:opacity-50"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-stone-200" />
              <span className="text-xs text-stone-400">or</span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            {/* Name field */}
            {view === "signup" && (
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-stone-600"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-stone-600"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-xs font-medium text-stone-600"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (view === "login") {
                      handleLogin();
                    } else {
                      handleSignup();
                    }
                  }
                }}
                className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-center text-xs text-red-500">
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={view === "login" ? handleLogin : handleSignup}
              disabled={loading}
              className="w-full rounded-xl bg-emerald-700 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : view === "login"
                  ? "Sign In"
                  : "Create Account"}
            </button>

            {/* Toggle view */}
            <p className="text-center text-sm text-stone-500">
              {view === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("signup")}
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchView("login")}
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

