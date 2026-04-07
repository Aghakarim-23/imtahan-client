"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [show, setShow] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabels = ["", "Zəif", "Orta", "Güclü", "Çox güclü"];
  const strengthColors = ["", "#E24B4A", "#EF9F27", "#1D9E75", "#1D9E75"];
  const strength = getStrength(form.newPassword);

  const validate = () => {
    const newErrors = {};
    if (!form.current) newErrors.current = "Cari şifrə tələb olunur";
    if (!form.newPassword) newErrors.newPassword = "Yeni şifrə tələb olunur";
    else if (form.newPassword.length < 8) newErrors.newPassword = "Şifrə ən az 8 simvol olmalıdır";
    if (!form.confirm) newErrors.confirm = "Şifrənin təsdiqi tələb olunur";
    else if (form.newPassword !== form.confirm) newErrors.confirm = "Şifrələr uyğun gəlmir";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
  };

  const EyeIcon = ({ visible }) =>
    visible ? (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  const inputClass =
    "w-full pl-9 pr-10 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md">


        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <h1
          className="text-center text-2xl font-semibold text-gray-900 mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Şifrəni dəyiş
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Yeni şifrənizi daxil edin
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} noValidate>

            <div className="mb-4">
              <label
                htmlFor="current"
                className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
              >
                Cari şifrə
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="current"
                  name="current"
                  type={show.current ? "text" : "password"}
                  value={form.current}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => toggleShow("current")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <EyeIcon visible={show.current} />
                </button>
              </div>
              {errors.current && <p className="text-xs text-red-500 mt-1">{errors.current}</p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
              >
                Yeni şifrə
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={show.newPassword ? "text" : "password"}
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => toggleShow("newPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <EyeIcon visible={show.newPassword} />
                </button>
              </div>

            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm"
                className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
              >
                Yeni şifrəni təsdiqlə
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="confirm"
                  name="confirm"
                  type={show.confirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => toggleShow("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <EyeIcon visible={show.confirm} />
                </button>
              </div>
              
              {/* Match indicator */}
              {form.confirm && form.newPassword && (
                <p className={`text-xs mt-1 ${form.newPassword === form.confirm ? "text-emerald-600" : "text-red-500"}`}>
                  {form.newPassword === form.confirm ? "Şifrələr uyğundur" : "Şifrələr uyğun gəlmir"}
                </p>
              )}
              {errors.confirm && !form.confirm && (
                <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition duration-150"
            >
              Şifrəni dəyiş
            </button>
          </form>
        ) : (
          <div>
            {/* Success state */}
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <svg className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Şifrəniz uğurla dəyişdirildi. İndi yeni şifrənizlə daxil ola bilərsiniz.
              </p>
            </div>

            <Link
              href="/auth/login"
              className="block w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg text-center transition duration-150"
            >
              Daxil olun
            </Link>
          </div>
        )}

        {/* Back link (only shown in form state) */}
        {!success && (
          <div className="flex items-center justify-center gap-1 mt-6 text-sm text-gray-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <Link href="/auth/login" className="text-emerald-600 font-medium hover:underline">
              Girişə qayıt
            </Link>
          </div>
        )}


      </div>
    </main>
  );
}