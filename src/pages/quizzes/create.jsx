"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuizCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Quiz başlığı tələb olunur";
    if (!form.description.trim()) newErrors.description = "Quiz təsviri tələb olunur";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Your API call to create quiz here
    // e.g. await createQuiz({ title: form.title, description: form.description })
    // Then redirect to the questions page
    router.push("/quiz/questions"); // adjust route as needed
  };

  const titleLen = form.title.length;
  const descLen = form.description.length;

  const charCountClass = (len, warn, max) => {
    if (len >= max) return "text-xs text-right mt-1 text-red-500";
    if (len > warn) return "text-xs text-right mt-1 text-amber-600";
    return "text-xs text-right mt-1 text-gray-400";
  };

  const inputBase =
    "w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 font-sans">

      {/* Top bar */}
      <div className="max-w-2xl mx-auto flex items-center gap-3 mb-6">
        <Link
          href="/quiz"
          className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Geri
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="text-gray-500">Quizlər</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-emerald-600 font-medium">Yeni quiz yarat</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">

        {/* Header card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="2" />
              <path d="M9 12h6M9 16h4" />
            </svg>
          </div>
          <div>
            <h1
              className="text-xl font-semibold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Yeni quiz yarat
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Quiz məlumatlarını daxil edin, sonra suallar əlavə edəcəksiniz
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">

          {/* Section label */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Əsas məlumatlar</p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Addım 1 / 2
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Quiz title */}
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
              >
                Quiz başlığı <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Məs: Azərbaycan tarixi — Əsas biliklər"
                maxLength={100}
                className={inputBase}
              />
              <div className="flex items-start justify-between mt-1">
                <p className="text-xs text-gray-400">Aydın və qısa bir başlıq seçin</p>
                <p className={charCountClass(titleLen, 90, 100)}>
                  {titleLen} / 100
                </p>
              </div>
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Quiz description */}
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase"
              >
                Quiz təsviri <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Bu quiz haqqında qısa məlumat verin. İştirakçılar nə öyrənəcək?"
                maxLength={500}
                rows={5}
                className={`${inputBase} resize-y min-h-[120px] leading-relaxed`}
              />
              <div className="flex items-start justify-between mt-1">
                <p className="text-xs text-gray-400">Minimum 20 simvol tövsiyə olunur</p>
                <p className={charCountClass(descLen, 450, 500)}>
                  {descLen} / 500
                </p>
              </div>
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

          </form>
        </div>

        {/* Actions card */}
        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between gap-3">
          <Link
            href="/quiz"
            className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
          >
            Ləğv et
          </Link>

          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-400 hidden sm:block">Sonra suallar əlavə edəcəksiniz</p>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium rounded-lg transition duration-150"
            >
              Davam et
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}