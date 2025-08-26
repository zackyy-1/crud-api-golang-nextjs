"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/components/context/themeContext";
import { getBookById, updateBook } from "@/libs/api";
import { ArrowLeft, Save, BookOpen, User, Calendar } from "lucide-react";

export default function EditBookPage() {
  const { id } = useParams(); // ambil id dari URL
  const router = useRouter();
  const { themeMode } = useTheme();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch data lama buat isi form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const book = await getBookById(Number(id));
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.year);
      } catch (err: any) {
        setErrorMsg("Gagal ambil data buku.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim() || !author.trim() || year === "") {
      setErrorMsg("Harap lengkapi semua field.");
      return;
    }

    try {
      setSubmitting(true);
      await updateBook(Number(id), {
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
      });

      setSuccessMsg("Buku berhasil diupdate!");
      setTimeout(() => {
        router.push("/dashboard1"); // balik ke dashboard
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

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
        <div className="flex items-center mb-6 gap-2">
          <h1 className="text-xl font-semibold mb-6"
            style={{
              color: themeMode === "dark" ? "#f9fafb" : "#111827",
            }}
          >
            Edit Buku
          </h1>
        </div>
        

        {errorMsg && <p className="mb-4 text-red-500">{errorMsg}</p>}
        {successMsg && <p className="mb-4 text-green-500">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Judul Buku
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <User className="w-4 h-4 mr-2" />
              Penulis
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Tahun Terbit
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full rounded-lg border px-4 py-2 text-sm"
              min="0"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded"
              >
              <Save className="w-4 h-4 mr-2 inline" />
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
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