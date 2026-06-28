import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API });

export const getCourses = () => client.get("/courses").then((r) => r.data);
export const getCourse = (id) => client.get(`/courses/${id}`).then((r) => r.data);
export const submitContact = (payload) =>
  client.post("/contact", payload).then((r) => r.data);
export const subscribeNewsletter = (email) =>
  client.post("/newsletter", { email }).then((r) => r.data);
export const createEnrollment = (payload) =>
  client.post("/enrollments", payload).then((r) => r.data);

export default client;
