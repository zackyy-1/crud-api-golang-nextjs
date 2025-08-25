"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/context/themeContext";
import { ArrowLeft, Plus, BookOpen, User, Calendar } from "lucide-react";

export default function AddBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { direction, themeMode } = useTheme();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

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

    if (!title.trim() || !author.trim() || year === "" || Number.isNaN(Number(year))) {
      setErrorMsg("Harap lengkapi semua field dengan benar.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Silakan login terlebih dahulu.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          year: Number(year),
        }),
      });

      if (!res.ok) {
        throw new Error(`Gagal menambahkan buku (HTTP ${res.status})`);
      }

      setSuccessMsg("Buku berhasil ditambahkan!");
      setTimeout(() => {
        router.push("/dashboard2");
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kesalahan saat menambahkan buku.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 transition-colors duration-300 flex items-center justify-center"
      style={{
        backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#f8fafc",
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mr-4"
            style={{ color: themeMode === "dark" ? "#e5e7eb" : "#6b7280" }}
            suppressHydrationWarning
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali
          </button>
          <h1 className="text-xl font-semibold" style={{ color: themeMode === "dark" ? "#e5e7eb" : "#111827" }}>
            Tambah Buku Baru
          </h1>
        </div>

        {/* Form Container */}
        <div className="rounded-xl shadow-sm p-6 transition-colors duration-300"
          style={{
            backgroundColor: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
            border: themeMode === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
          }}
        >
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#4c1d1d" : "#fef2f2",
                color: themeMode === "dark" ? "#fca5a5" : "#dc2626",
                border: themeMode === "dark" ? "1px solid #7f1d1d" : "1px solid #fecaca",
              }}
            >
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: themeMode === "dark" ? "#1a3a1a" : "#f0fdf4",
                color: themeMode === "dark" ? "#86efac" : "#16a34a",
                border: themeMode === "dark" ? "1px solid #2d5a2d" : "1px solid #bbf7d0",
              }}
            >
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center"
                style={{ color: themeMode === "dark" ? "#e5e7eb" : "#374151" }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Judul Buku
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#f9fafb",
                  borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                  color: themeMode === "dark" ? "#e5e7eb" : "#111827",
                }}
                placeholder="Masukkan judul buku"
                required
              />
            </div>

            {/* Author Field */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center"
                style={{ color: themeMode === "dark" ? "#e5e7eb" : "#374151" }}
              >
                <User className="w-4 h-4 mr-2" />
                Penulis
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#f9fafb",
                  borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                  color: themeMode === "dark" ? "#e5e7eb" : "#111827",
                }}
                placeholder="Masukkan nama penulis"
                required
              />
            </div>

            {/* Year Field */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center"
                style={{ color: themeMode === "dark" ? "#e5e7eb" : "#374151" }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Tahun Terbit
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#f9fafb",
                  borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                  color: themeMode === "dark" ? "#e5e7eb" : "#111827",
                }}
                placeholder="Masukkan tahun terbit"
                min="0"
                max={new Date().getFullYear()}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: submitting ? "#9ca3af" : "#3b82f6",
                  color: "#ffffff",
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                {submitting ? "Menambah..." : "Tambah Buku"}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                style={{
                  backgroundColor: themeMode === "dark" ? "#374151" : "#f9fafb",
                  borderColor: themeMode === "dark" ? "#4b5563" : "#d1d5db",
                  color: themeMode === "dark" ? "#e5e7eb" : "#374151",
                }}
              >
                Batal
              </button>
            </div>
          </form>

          {/* Info Note */}
          <div className="mt-6 p-3 rounded-lg text-xs"
            style={{
              backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#f1f5f9",
              color: themeMode === "dark" ? "#9ca3af" : "#64748b",
            }}
          >
            <p>Pastikan Anda sudah login dan memiliki token yang valid.</p>
          </div>
        </div>
      </div>
    </div>
  );
}