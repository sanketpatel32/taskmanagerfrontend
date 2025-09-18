import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Axios instance (base URL + JSON headers)
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header automatically if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth APIs ---
export const signup = async (email, password) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const signin = async (email, password) => {
  const res = await api.post("/auth/signin", { email, password });
  return res.data;
};

// --- Task APIs ---
export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (payload) => {
  const res = await api.post("/tasks", payload);
  return res.data;
};

export const updateTask = async (id, payload) => {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

// --- Token helpers ---
export const saveToken = async (token) => {
  localStorage.setItem("token", token);
};

export const logout = async () => {
  localStorage.removeItem("token");
};
