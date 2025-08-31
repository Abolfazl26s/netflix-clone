"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// لیست پروفایل‌های پیش‌فرض با مسیرهای صحیح
const profiles = [
  { id: 1, name: "Saeid", image: "/images/profile-blue.png" },
  { id: 2, name: "Guest", image: "/images/profile-red.png" },
  { id: 3, name: "Kids", image: "/images/profile-green.png" },
  { id: 4, name: "User", image: "/images/profile-yellow.png" },
];

interface ProfileCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

// کامپوننت کارت برای هر پروفایل
function ProfileCard({ name, image, onClick }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className="group w-32 cursor-pointer text-center sm:w-44"
    >
      <div className="overflow-hidden rounded-md border-2 border-transparent transition-all duration-300 group-hover:border-white">
        <Image
          src={image}
          alt={name}
          width={176}
          height={176}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="mt-2 text-gray-400 transition-colors duration-300 group-hover:text-white">
        {name}
      </p>
    </div>
  );
}

function ProfilesPage() {
  const router = useRouter();

  // تابعی که با انتخاب پروفایل اجرا می‌شود
  const selectProfile = (profile: { id: number; name: string }) => {
    // نام پروفایل انتخاب‌شده را در localStorage ذخیره می‌کنیم
    localStorage.setItem("selectedProfile", profile.name);
    // کاربر را به صفحه اصلی هدایت می‌کنیم
    router.push("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#141414] p-4">
      <h1 className="mb-8 text-4xl text-white md:text-5xl">{`Who's watching?`}</h1>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            name={profile.name}
            image={profile.image}
            onClick={() => selectProfile(profile)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfilesPage;
