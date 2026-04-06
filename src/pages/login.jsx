"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }
    // Your auth logic here
    alert("Uğurla daxil oldunuz!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center text-2xl font-semibold text-gray-900 mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Giriş səhifəsi
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Hesabınıza daxil olun
        </p>

        <form onSubmit={handleLogin} noValidate>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
            >
              E-poçt ünvanı
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nümunə@mail.com"
                autoComplete="email"
                className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
            >
              Şifrə
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-9 pr-10 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Şifrəni göstər"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-emerald-500 w-4 h-4 cursor-pointer"
              />
              Məni xatırla
            </label>
            <Link href="#" className="text-sm text-emerald-600 font-medium hover:underline">
              Şifrəni unutmusunuz?
            </Link>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition duration-150"
          >
            Daxil ol
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Hesabınız yoxdur?{" "}
          <Link href="/register" className="text-emerald-600 font-medium hover:underline">
            Qeydiyyatdan keçin
          </Link>
        </p>

        {/* Azerbaijan flag badge */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="flex h-2 w-5 rounded overflow-hidden">
            <div className="flex-1 bg-[#0092BC]" />
            <div className="flex-1 bg-[#E8112D]" />
            <div className="flex-1 bg-[#00AE65]" />
          </div>
          <span className="text-xs text-gray-400">Azərbaycan</span>
        </div>

      </div>
    </main>
  );
}