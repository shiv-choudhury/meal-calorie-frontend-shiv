"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Spinner from "@/components/Spinner";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore((state) => state);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-teal-900 dark:to-emerald-950 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center h-screen text-2xl">
        <Spinner size={48} className="text-emerald-600" />
        {/* <div className="mt-2">Loading Please Wait...!</div> */}
      </div>
    </div>
  );
}
