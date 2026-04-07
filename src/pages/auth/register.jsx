"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "username" ? value.replace(/\s/g, "_").toLowerCase() : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };






  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Your registration logic here
    alert("Qeydiyyat uğurla tamamlandı!");
  };

  const inputClass =
    "w-full pl-9 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition";


  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-9 w-full max-w-lg">


        <h1
          className="text-center text-2xl font-semibold text-gray-900 mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Qeydiyyat
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">Yeni hesab yaradın</p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Ad
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="name" name="name" type="text"
                  value={form.name} onChange={handleChange}
                  placeholder="Əli"
                  className={inputClass}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="surname" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Soyad
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="surname" name="surname" type="text"
                  value={form.surname} onChange={handleChange}
                  placeholder="Həsənov"
                  className={inputClass}
                />
              </div>
              {errors.surname && <p className="text-xs text-red-500 mt-1">{errors.surname}</p>}
            </div>
          </div>

          
          <div className="mb-4">
            <label htmlFor="username" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
              İstifadəçi adı
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </span>
              <input
                id="username" name="username" type="text"
                value={form.username} onChange={handleChange}
                placeholder="ali_həsənov"
                className={inputClass}
              />
            </div>
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
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
                id="email" name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="nümunə@mail.com"
                className={inputClass}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
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
                id="password" name="password"
                type={showPassword ? "text" : "password"}
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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

            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition duration-150"
          >
            Qeydiyyatdan keç
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Artıq hesabınız var?{" "}
          <Link href="/auth/login" className="text-emerald-600 font-medium hover:underline">
            Daxil olun
          </Link>
        </p>


      </div>
    </main>
  );
}