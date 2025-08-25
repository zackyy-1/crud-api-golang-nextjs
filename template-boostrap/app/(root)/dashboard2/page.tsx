"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/context/themeContext";
import { getBooks, deleteBook } from "@/libs/api"; // pake API lu

export default function Dashboard1() {
  const router = useRouter();
  const { direction, themeMode, primaryColor, backgroundColor } = useTheme();

  // state buat data books
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const totalPages = Math.ceil(books.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = books.slice(startIndex, startIndex + rowsPerPage);

  // ambil data dari backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks(); // otomatis kirim token lewat interceptor
        setBooks(res); // pastiin backend balikin array
      } catch (err: any) {
        console.error("Gagal fetch books:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // delete handler
  const handleDelete = async (id: number) => {
    if (confirm("Yakin mau hapus buku ini?")) {
      try {
        await deleteBook(id);
        setBooks((prev) => prev.filter((b) => b.id !== id)); // update state biar ga reload
      } catch (err: any) {
        alert("Gagal hapus buku: " + err.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen p-12 transition-colors duration-300"
      style={{
        backgroundColor: themeMode === "dark" ? "#1e1e2f" : backgroundColor,
        direction: direction,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="p-6 mb-8 shadow-lg transition-colors duration-300"
          style={{
            background: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
            color: themeMode === "dark" ? "#FFFFFF" : "#171717",
          }}
        >
          <h1 className="text-2xl font-bold mb-2">
            Hi, Welcome Back <span className="text-blue-500">John!</span>
          </h1>
          <p className="mb-4">Books management with JWT auth 🚀</p>
        </div>

        {/* Table */}
        <div
          className="p-4 shadow rounded-xl transition-colors duration-300"
          style={{
            background: themeMode === "dark" ? "#2a2a3b" : "#ffffff",
            color: themeMode === "dark" ? "#FFFFFF" : "#171717",
          }}
        >
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Books Table</h1>
                <Link
                    href="/add"
                    className="px-4 py-2 no-underline bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                + Tambah Data
                </Link>
            </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border border-gray-200 rounded-lg">
              <thead
                style={{
                  background: themeMode === "dark" ? "#1e1e2f" : "#f3f4f6",
                  color: themeMode === "dark" ? "#FFFFFF" : "#171717",
                }}
              >
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Author</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((book) => (
                  <tr key={book.id} className="text-center">
                    <td className="p-2 border">{book.id}</td>
                    <td className="p-2 border">{book.title}</td>
                    <td className="p-2 border">{book.author}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/edit/${book.id}`)} // nanti bikin edit page
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded disabled:opacity-50 transition-colors duration-300"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded disabled:opacity-50 transition-colors duration-300"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}