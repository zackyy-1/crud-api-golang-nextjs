import axios from "axios";

const API_URL = "http://localhost:8000";

// bikin instance axios biar bisa pake interceptor
const api = axios.create({
  baseURL: API_URL,
});

// interceptor buat nambahin token ke header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ambil token dari localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Register User
export const registerUser = async (data: { username: string; email: string; password: string }) => {
  const res = await api.post(`/users`, data);
  return res.data;
};

// Login User
export const loginUser = async (data: { username: string; password: string }) => {
  const res = await api.post(`/login`, data);

  // simpan token ke localStorage biar bisa dipake di request lain
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

// Get all books
export const getBooks = async (limit?: number, offset?: number) => {
  const res = await api.get(`/books`, {
    params: { limit, offset },
  });
  return res.data;
};

// Get book by ID
export const getBookById = async (id: number) => {
  const res = await api.get(`/books/${id}`);
  return res.data;
};

// Create book (auth required)
export const createBook = async (data: { title: string; author: string }) => {
  const res = await api.post(`/books`, data);
  return res.data;
};

// Update book (auth required)
export const updateBook = async (id: number, data: { title?: string; author?: string }) => {
  const res = await api.put(`/books/${id}`, data);
  return res.data;
};

// Delete book (auth required)
export const deleteBook = async (id: number) => {
  const res = await api.delete(`/books/${id}`);
  return res.data;
};