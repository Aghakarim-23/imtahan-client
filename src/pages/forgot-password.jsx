"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError("Düzgün e-poçt ünvanı daxil edin.");
      return;
    }
    // Your password reset logic here (e.g. API call)
    setSent(true);
  };

  const handleResend = () => {
    setSent(false);
    setEmail("");
    setError("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center text-2xl font-semibold text-gray-900 mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Şifrəmi unutdum
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8 leading-relaxed">
          E-poçt ünvanınızı daxil edin,<br />bərpa linki göndərəcəyik
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} noValidate>
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
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="nümunə@mail.com"
                  autoComplete="email"
                  className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition"
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition duration-150"
            >
              Bərpa linki göndər
            </button>
          </form>
        ) : (
          <div>
            {/* Success state */}
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-5">
              <svg className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Bərpa linki <span className="font-medium">{email}</span> ünvanına göndərildi. Zəhmət olmasa e-poçtunuzu yoxlayın.
              </p>
            </div>

            <button
              onClick={handleResend}
              className="w-full py-2.5 bg-white hover:bg-emerald-50 active:scale-[0.98] text-emerald-600 text-sm font-medium rounded-lg border border-emerald-200 transition duration-150"
            >
              Yenidən göndər
            </button>
          </div>
        )}

        {/* Back to login */}
        <div className="flex items-center justify-center gap-1 mt-6 text-sm text-gray-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <Link href="/login" className="text-emerald-600 font-medium hover:underline">
            Girişə qayıt
          </Link>
        </div>

        {/* Azerbaijan flag */}
        <div className="flex items-center justify-center gap-2 mt-5">
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