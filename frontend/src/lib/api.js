import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

// Attach token from localStorage on every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("nq_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Public ----
export const getCourses = () => client.get("/courses").then((r) => r.data);
export const getCourse = (id) => client.get(`/courses/${id}`).then((r) => r.data);
export const getSiteContent = () => client.get("/site-content").then((r) => r.data);
export const getMedia = (type) =>
  client.get("/media", { params: type ? { type } : {} }).then((r) => r.data);
export const submitContact = (payload) =>
  client.post("/contact", payload).then((r) => r.data);
export const subscribeNewsletter = (email) =>
  client.post("/newsletter", { email }).then((r) => r.data);
export const createEnrollment = (payload) =>
  client.post("/enrollments", payload).then((r) => r.data);

// ---- Auth ----
export const login = (username, password) =>
  client.post("/auth/login", { username, password }).then((r) => r.data);
export const fetchMe = () => client.get("/auth/me").then((r) => r.data);

// ---- Admin: Courses ----
export const adminCreateCourse = (payload) =>
  client.post("/admin/courses", payload).then((r) => r.data);
export const adminUpdateCourse = (id, payload) =>
  client.put(`/admin/courses/${id}`, payload).then((r) => r.data);
export const adminDeleteCourse = (id) =>
  client.delete(`/admin/courses/${id}`).then((r) => r.data);

// ---- Admin: Media ----
export const adminCreateMedia = (payload) =>
  client.post("/admin/media", payload).then((r) => r.data);
export const adminDeleteMedia = (id) =>
  client.delete(`/admin/media/${id}`).then((r) => r.data);

// ---- Admin: Site content ----
export const adminUpdateSiteContent = (payload) =>
  client.put("/admin/site-content", payload).then((r) => r.data);

// ---- Admin: Inbox ----
export const adminGetContacts = () => client.get("/admin/contacts").then((r) => r.data);
export const adminGetNewsletter = () => client.get("/admin/newsletter").then((r) => r.data);
export const adminGetEnrollments = () => client.get("/admin/enrollments").then((r) => r.data);
export const adminGetStats = () => client.get("/admin/stats").then((r) => r.data);
export const adminDeleteItem = (collection, id) =>
  client.delete(`/admin/${collection}/${id}`).then((r) => r.data);

export default client;
