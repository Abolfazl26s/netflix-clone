"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// این کامپوننت کامپوننت‌های سرور را به عنوان children دریافت می‌کند
export default function HomePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      const selectedProfile = localStorage.getItem("selectedProfile");
      if (!selectedProfile) {
        router.push("/profiles");
      } else {
        setIsReady(true);
      }
    }
  }, [status, router]);

  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // اگر همه چیز آماده بود، محتوای اصلی (که از سرور آمده) را نمایش بده
  return <>{children}</>;
}
