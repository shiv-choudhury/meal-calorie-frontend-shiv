"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Apple, Moon, Sun } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { login } from "../api/auth";
import InputWithLabel from "@/components/InputWithLabel";

export default function NutriTrackLogin() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  type FormValues = {
    email: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("Form submitted:", data);
    try {
      setLoading(true);
      const response: any = await login(data);
      console.log("login response", response?.data);
      if (response?.error) {
        toast.error(response.error);
        return;
      } else {
        toast.success(response?.message || "Logged in successfully");
        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong");
      console.error(error?.response?.data?.error || error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-teal-900 dark:to-emerald-950 transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Apple className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                NutriTrack
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nutrition Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Header Text */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue tracking your nutrition
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Please enter your email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                }}
                render={({ field }) => (
                  <InputWithLabel
                    inputprops={{ name: "email" }}
                    placeholder="Enter your email"
                    onChange={field.onChange}
                    value={field.value}
                    label="Email address"
                    error={errors.email?.message as string}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                }}
                render={({ field }) => (
                  <InputWithLabel
                    inputprops={{ name: "password" }}
                    placeholder="Enter your password"
                    onChange={field.onChange}
                    value={field.value}
                    label="Password"
                    isPassword={true}
                    error={errors.password?.message as string}
                  />
                )}
              />

              <button
                onClick={onSubmit}
                disabled={loading}
                className="w-full disabled:cursor-not-allowed disabled:opacity-50 py-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/50 dark:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
