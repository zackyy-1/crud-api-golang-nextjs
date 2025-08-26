"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/context/themeContext";
import { createBook } from "@/libs/api";
import { ArrowLeft, Plus, BookOpen, User, Calendar } from "lucide-react";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { themeMode } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // validasi form
    if (!title.trim() || !author.trim() || year === "" || Number.isNaN(Number(year))) {
      setErrorMsg("Harap lengkapi semua field dengan benar.");
      return;
    }

    try {
      setSubmitting(true);

      // panggil createBook dari api.ts, kita kirim title dan author
      await createBook({
        title: title.trim(),
        author: author.trim(),
        // kalo backend lu support year, bisa ditambahin:
        year: Number(year)
      });

      setSuccessMsg("Buku berhasil ditambahkan!");
      setTimeout(() => {
        router.push("/dashboard2"); // balik ke halaman dashboard
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kesalahan saat menambahkan buku.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex-1 p-6 transition-colors duration-300"
      style={{
        backgroundColor: themeMode === "dark" ? "#111827" : "#f1f5f9",
      }}
    >

      <button
        onClick={() => router.back()}
        className="flex items-center px-3 py-2 rounded text-sm font-medium transition-colors duration-300"
        style={{
          backgroundColor: themeMode === "dark" ? "#2563eb" : "#2563eb",
          color: themeMode === "dark" ?  "#ffffff" : "#ffffff",
        }}
        suppressHydrationWarning
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Kembali
      </button>
          
      <div
        className="max-w-2xl mx-auto rounded-2xl shadow-lg p-8 transition-all duration-300"
        style={{
          backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
          color: themeMode === "dark" ? "#FFFFFF" : "#171717",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-6 gap-2">
          <h1
            className="text-xl font-semibold"
            style={{
              color: themeMode === "dark" ? "#f9fafb" : "#111827",
            }}
          >
            Tambah Buku Baru
          </h1>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-4 rounded-lg border text-sm p-3 bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg border text-sm p-3 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 translation-colors duration-300">
          {/* Title */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Judul Buku
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/60 focus:outline-none transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#111827" : "#f9fafb",
                borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                color: themeMode === "dark" ? "#f9fafb" : "#111827",
              }}
              placeholder="Masukkan judul buku"
              required 
              suppressHydrationWarning
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-medium">
              <User className="w-4 h-4 mr-2" /> 
              Penulis
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/60 focus:outline-none transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#111827" : "#f9fafb",
                borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                color: themeMode === "dark" ? "#f9fafb" : "#111827",
              }}
              placeholder="Masukkan nama penulis"
              required
              suppressHydrationWarning
            />
          </div>

          {/* Year */}
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Tahun Terbit
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/60 focus:outline-none transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#111827" : "#f9fafb",
                borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                color: themeMode === "dark" ? "#f9fafb" : "#111827",
              }}
              placeholder="Masukkan tahun terbit"
              min="0"
              max={new Date().getFullYear()}
              required
              suppressHydrationWarning
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center flex-1 rounded px-5 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
              style={{
                backgroundColor: submitting ? "#9ca3af" : "#2563eb",
              }}
              suppressHydrationWarning
            >
              <Plus className="w-4 h-4 mr-2" />
              {submitting ? "Menambah..." : "Tambah Buku"}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#374151" : "#f9fafb",
                borderColor: themeMode === "dark" ? "#4b5563" : "#c4c5c7ff",
                color: themeMode === "dark" ? "#f9fafb" : "#374151",
              }}
              suppressHydrationWarning
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}