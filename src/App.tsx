import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { DepartmentsPage } from '@/pages/public/DepartmentsPage';
import { DepartmentDetailPage } from '@/pages/public/DepartmentDetailPage';
import { FacultyPage } from '@/pages/public/FacultyPage';
import { FacultyProfilePage } from '@/pages/public/FacultyProfilePage';
import { CoursesPage } from '@/pages/public/CoursesPage';
import { CourseDetailPage } from '@/pages/public/CourseDetailPage';
import { AdmissionsPage } from '@/pages/public/AdmissionsPage';
import { AdmissionFormPage } from '@/pages/public/AdmissionFormPage';
import { AdmissionStatusPage } from '@/pages/public/AdmissionStatusPage';
import { NoticesPage } from '@/pages/public/NoticesPage';
import { NoticeDetailPage } from '@/pages/public/NoticeDetailPage';
import { EventsPage } from '@/pages/public/EventsPage';
import { EventDetailPage } from '@/pages/public/EventDetailPage';
import { GalleryPage } from '@/pages/public/GalleryPage';
import { StudentCornerPage } from '@/pages/public/StudentCornerPage';
import { ResultsPage } from '@/pages/public/ResultsPage';
import { StudyMaterialsPage } from '@/pages/public/StudyMaterialsPage';
import { TimetablePage } from '@/pages/public/TimetablePage';
import { ContactPage } from '@/pages/public/ContactPage';

import { LoginPage } from '@/pages/auth/LoginPage';
import { AdminLoginPage } from '@/pages/auth/AdminLoginPage';

import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminFacultyPage } from '@/pages/admin/AdminFacultyPage';
import { AdminCoursesPage } from '@/pages/admin/AdminCoursesPage';
import { AdminNoticesPage } from '@/pages/admin/AdminNoticesPage';
import { AdminEventsPage } from '@/pages/admin/AdminEventsPage';
import { AdminGalleryPage } from '@/pages/admin/AdminGalleryPage';
import { AdminAdmissionsPage } from '@/pages/admin/AdminAdmissionsPage';
import { AdminStudentsPage } from '@/pages/admin/AdminStudentsPage';
import { AdminMessagesPage } from '@/pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import { AdminPlaceholder } from '@/pages/admin/AdminPlaceholder';

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center">
        <p className="font-display text-6xl font-bold text-navy-700">404</p>
        <p className="mt-2 text-slate-500">Page not found</p>
        <a href="/" className="mt-4 inline-block text-navy-600 hover:underline">Go home</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/departments/:id" element={<DepartmentDetailPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/faculty/:id" element={<FacultyProfilePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="/admissions/apply" element={<AdmissionFormPage />} />
              <Route path="/admissions/status" element={<AdmissionStatusPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/notices/:id" element={<NoticeDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/student-corner" element={<StudentCornerPage />} />
              <Route path="/student-corner/results" element={<ResultsPage />} />
              <Route path="/student-corner/study-materials" element={<StudyMaterialsPage />} />
              <Route path="/student-corner/timetable" element={<TimetablePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="home" element={<AdminPlaceholder title="Home Page" description="Manage homepage content" />} />
              <Route path="about" element={<AdminPlaceholder title="About Us" description="Manage about page content" />} />
              <Route path="departments" element={<AdminPlaceholder title="Departments" description="Manage department content" />} />
              <Route path="faculty" element={<AdminFacultyPage />} />
              <Route path="courses" element={<AdminCoursesPage />} />
              <Route path="notices" element={<AdminNoticesPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="admissions" element={<AdminAdmissionsPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="results" element={<AdminPlaceholder title="Results" description="Manage examination results" />} />
              <Route path="study-materials" element={<AdminPlaceholder title="Study Materials" description="Manage study materials" />} />
              <Route path="users" element={<AdminPlaceholder title="Users" description="Manage admin users" />} />
              <Route path="messages" element={<AdminMessagesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
