"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Apple, Moon, Sun } from "lucide-react";
import { register as registerUser } from "../api/auth";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import InputWithLabel from "@/components/InputWithLabel";
import useAuthStore from "@/store/authStore";

export default function NutriTrackSignup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const response: any = await registerUser(data);

      if (response?.error) {
        toast.error(response.error);
        return;
      } else {
        toast.success(response?.message || "Account created successfully");
        if (response?.data?.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        setUser({ email: data.email, firstName: data.firstName });
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
    <div className={darkMode ? "dark" : "light"}>
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
                Create Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join today to track your nutrition
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: "Please enter your first name" }}
                    render={({ field }) => (
                      <InputWithLabel
                        inputprops={{ name: "firstName" }}
                        placeholder="John"
                        onChange={field.onChange}
                        value={field.value}
                        label="First Name"
                        error={errors.firstName?.message as string}
                      />
                    )}
                  />
                </div>

                <div>
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: "Please enter your last name" }}
                    render={({ field }) => (
                      <InputWithLabel
                        inputprops={{ name: "lastName" }}
                        placeholder="Doe"
                        onChange={field.onChange}
                        value={field.value}
                        label="Last Name"
                        error={errors.lastName?.message as string}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Email Field */}
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

              {/* Password Field */}
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
                    placeholder="Create a password"
                    onChange={field.onChange}
                    value={field.value}
                    label="Password"
                    isPassword={true}
                    error={errors.password?.message as string}
                  />
                )}
              />

              {/* Submit Button */}
              <button
                onClick={onSubmit}
                disabled={loading}
                className="w-full disabled:cursor-not-allowed disabled:opacity-50 py-4 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/50 dark:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Footer */}
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
