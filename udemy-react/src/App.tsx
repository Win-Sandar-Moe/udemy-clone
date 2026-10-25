import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./public-page/Home.tsx";
import Header from "./public-page/Header.tsx";
import Footer from "./public-page/Footer.tsx";
import LoginPage from "./public-page/LoginPage.tsx";
import UnauthorizePage from "./public-page/UnauthorizePage.tsx";
import ProtectedRoute from "./auth/page/ProtectedRoute.tsx";
import TeacherLayout from "./teacher/page/TeacherLayout.tsx";
import CourseForm from "./teacher/page/CourseForm.tsx";
import CourseTable from "./teacher/page/CourseTable.tsx";
import CourseLessonForm from "./teacher/page/CourseLessonForm.tsx";
import BrowseAllCourses from "./student/BrowseAllCourses.tsx";
import ViewCourseDetails from "./student/ViewCourseDetails.tsx";
import ViewCart from "./cart/ViewCart.tsx";
import MyLearning from "./student/MyLearning.tsx";
import {CourseLessonPage} from "./student/CourseLessonPage.tsx";
import Register from "./public-page/Register.tsx";

export default function App() {
    return (
        <>


            <BrowserRouter>
                <Header />
                <Routes>
                    {/* Public Routes*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/unauthorized" element={<UnauthorizePage />} />

                {/*    Role-Based Protected Routes (ROLE_STUDENT)*/}
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_STUDENT"]} />}>
                        <Route path="/courses" element={<BrowseAllCourses />} />
                        <Route path="/courses/:id" element={<ViewCourseDetails />} />
                        <Route path="/cart" element={<ViewCart />} />
                        <Route path="/my-learning" element={<MyLearning />} />
                        <Route path="/courses/:id/learn" element={<CourseLessonPage />} />
                    </Route>

                {/*    Role-Based Protected Routes (ROLE_TEACHER)*/}
                    <Route
                           element={<ProtectedRoute allowedRoles={["ROLE_TEACHER"]} />} >
                        <Route path="/teacher/dashboard" element={<TeacherLayout />} >
                            <Route path="create-course" element={<CourseForm />} />
                            <Route path="course-table" element={<CourseTable />} />
                            {/* /teacher/dashboard/create-lesson/:id */}
                            <Route path="create-lesson/:id" element={<CourseLessonForm />} />
                        </Route>
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}
