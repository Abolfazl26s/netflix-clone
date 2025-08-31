import { Suspense } from "react";
import Header from "@/components/Header";
import MovieModal from "@/components/MovieModal";
import BannerSkeleton from "@/components/BannerSkeleton";
import RowSkeleton from "@/components/RowSkeleton";
import BannerContent from "@/components/BannerContent";
import RowsContent from "@/components/RowsContent";
// کامپوننت کلاینت جدید را وارد می‌کنیم
import HomePageClient from "@/components/HomePageClient";

// این کامپوننت حالا یک کامپوننت سرور است (چون 'use client' ندارد)
export default function Home() {
  return (
    // کامپوننت کلاینت، تمام محتوای سرور را به عنوان children دریافت می‌کند
    <HomePageClient>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Suspense fallback={<BannerSkeleton />}>
            <BannerContent />
          </Suspense>

          <Suspense
            fallback={
              <>
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </>
            }
          >
            <RowsContent />
          </Suspense>

          <MovieModal />
        </main>
      </div>
    </HomePageClient>
  );
}
