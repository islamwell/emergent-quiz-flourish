import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Kids from "./pages/Kids";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import ArabicQuiz from "./pages/ArabicQuiz";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSiteContent from "./pages/admin/AdminSiteContent";
import AdminInbox from "./pages/admin/AdminInbox";
import { AuthProvider } from "./context/AuthContext";
import { SiteContentProvider } from "./context/SiteContentContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public site */}
            <Route
              element={
                <SiteContentProvider>
                  <Layout />
                </SiteContentProvider>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quiz" element={<ArabicQuiz />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="content" element={<AdminSiteContent />} />
              <Route path="inbox" element={<AdminInbox />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
