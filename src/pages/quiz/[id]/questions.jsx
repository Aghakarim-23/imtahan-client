"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const LETTERS = ["A", "B", "C", "D"];

const optionStyles = {
  A: "bg-emerald-50 text-emerald-800 border-emerald-200",
  B: "bg-blue-50 text-blue-800 border-blue-200",
  C: "bg-amber-50 text-amber-800 border-amber-200",
  D: "bg-pink-50 text-pink-800 border-pink-200",
};

function createQuestion() {
  return {
    id: Date.now() + Math.random(),
    title: "",
    options: { A: "", B: "", C: "", D: "" },
    correct: null,
  };
}

export default function QuizQuestionsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([createQuestion()]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ---------- Helpers ----------
  const updateQuestion = (qId, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, [field]: value } : q))
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${qId}-${field}`];
      return next;
    });
  };

  const updateOption = (qId, letter, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: { ...q.options, [letter]: value } } : q
      )
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${qId}-opts`];
      return next;
    });
  };

  const setCorrect = (qId, letter) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, correct: letter } : q))
    );
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${qId}-correct`];
      return next;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion()]);
  };

  const removeQuestion = (qId) => {
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  // ---------- Validation ----------
  const validate = () => {
    const newErrors = {};
    questions.forEach((q) => {
      if (!q.title.trim()) newErrors[`${q.id}-title`] = "Sual mətni tələb olunur";
      const allFilled = LETTERS.every((l) => q.options[l].trim());
      if (!allFilled) newErrors[`${q.id}-opts`] = "Bütün variantları doldurun";
      if (!q.correct) newErrors[`${q.id}-correct`] = "Düzgün cavabı seçin";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Submit ----------
  const handleSave = async () => {
    if (questions.length === 0) return;
    if (!validate()) return;
    setLoading(true);

    try {
      // Replace with your real API call:
      // await fetch(`/api/quiz/${id}/questions`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ questions }),
      // });

      await new Promise((r) => setTimeout(r, 700)); // mock delay
      router.push(`/quiz`); // redirect after save
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">

      {/* Top bar */}
      <div className="max-w-2xl mx-auto flex items-center gap-3 mb-6">
        <Link
          href={`/quiz/${id}`}
          className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-100 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Geri
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/quiz" className="text-gray-500 hover:text-emerald-600 transition">Quizlər</Link>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-gray-500">Quiz #{id}</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-emerald-600 font-medium">Suallar</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">

        {/* Header card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h1
                className="text-lg font-semibold text-gray-900 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Suallar əlavə et
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Quiz ID: <span className="font-medium text-gray-500">#{id}</span> · Addım 2 / 2
              </p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap">
            {questions.length} sual
          </span>
        </div>

        {/* Question cards */}
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-6">

            {/* Card header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Sual {idx + 1}
              </span>
              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-100 hover:border-red-200 rounded-lg px-2.5 py-1.5 transition"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Sil
                </button>
              )}
            </div>

            {/* Question title */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
                Sual mətni <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={q.title}
                onChange={(e) => updateQuestion(q.id, "title", e.target.value)}
                placeholder="Sualı daxil edin..."
                className={inputBase}
              />
              {errors[`${q.id}-title`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`${q.id}-title`]}</p>
              )}
            </div>

            {/* Options grid */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">
                Variantlar <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {LETTERS.map((letter) => (
                  <div key={letter} className="relative">
                    <div
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-semibold pointer-events-none ${optionStyles[letter]}`}
                    >
                      {letter}
                    </div>
                    <input
                      type="text"
                      value={q.options[letter]}
                      onChange={(e) => updateOption(q.id, letter, e.target.value)}
                      placeholder={`Variant ${letter}`}
                      className="w-full pl-10 pr-3 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white transition"
                    />
                  </div>
                ))}
              </div>
              {errors[`${q.id}-opts`] && (
                <p className="text-xs text-red-500 mt-1.5">{errors[`${q.id}-opts`]}</p>
              )}
            </div>

            {/* Correct answer selector */}
            <div className="pt-3.5 border-t border-gray-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-medium text-gray-500">Düzgün cavab:</span>
                {LETTERS.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setCorrect(q.id, letter)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                      q.correct === letter
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
                {q.correct && (
                  <span className="text-xs text-emerald-600 font-medium ml-1">
                    ✓ Variant {q.correct} seçildi
                  </span>
                )}
              </div>
              {errors[`${q.id}-correct`] && (
                <p className="text-xs text-red-500 mt-2">{errors[`${q.id}-correct`]}</p>
              )}
            </div>

          </div>
        ))}

        {/* Add question button */}
        <button
          onClick={addQuestion}
          className="w-full py-3 bg-white hover:bg-emerald-50 text-emerald-600 text-sm font-medium border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni sual əlavə et
        </button>

        {/* Actions */}
        <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between gap-3">
          <Link
            href={`/quiz/${id}`}
            className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
          >
            Ləğv et
          </Link>
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-400 hidden sm:block">
              {questions.length} sual əlavə edilib
            </p>
            <button
              onClick={handleSave}
              disabled={loading || questions.length === 0}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition duration-150"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Saxlanılır...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Yadda saxla
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}