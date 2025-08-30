// src/app/signin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-md bg-[#141414] p-8">
        <h1 className="mb-6 text-2xl font-bold text-white">Sign In</h1>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form
          onSubmit={handleCredentialsSignIn}
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type: test@example.com for login"
            className="rounded bg-gray-700 p-3 text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type:password"
            className="rounded bg-gray-700 p-3 text-white"
          />
          <button type="submit" className="rounded bg-red-600 p-3 font-bold">
            Sign In
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full rounded bg-white p-3 font-bold text-black"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
