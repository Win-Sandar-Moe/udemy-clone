
import { NavLink, Outlet } from 'react-router-dom';
import {
    BsCollectionPlay,
    BsPlusCircle,
    BsCardList,
    BsFileEarmarkPlus
} from 'react-icons/bs';

const TeacherLayout = () => {
    return (
        <div className="container-fluid bg-light min-vh-100 p-0">
            <div className="row g-0">

                {/* Sidebar */}
                <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white min-vh-100 p-3 shadow-sm position-sticky top-0 d-flex flex-column">
                    {/* Logo / Header */}
                    <div className="d-flex align-items-center mb-4 pb-3 border-bottom border-secondary">
            <span className="fs-4 fw-bold text-white tracking-wide">
              <span className="text-warning">U</span>demy <small className="fs-6 text-muted">Instructor</small>
            </span>
                    </div>

                    {/* Navigation Links */}
                    <ul className="nav nav-pills flex-column mb-auto gap-2">
                        <li className="nav-item">
                            <small className="text-uppercase text-secondary fw-bold px-3 d-block mb-1" style={{ fontSize: '0.75rem' }}>
                                Course Management
                            </small>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/teacher/dashboard/course-table"
                                end
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 text-white ${isActive ? 'active bg-primary shadow-sm' : ''}`
                                }
                            >
                                <BsCollectionPlay size={18} /> My Courses
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/teacher/dashboard/create-course"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 text-white ${isActive ? 'active bg-primary shadow-sm' : ''}`
                                }
                            >
                                <BsPlusCircle size={18} /> Create Course
                            </NavLink>
                        </li>

                        <li className="nav-item mt-3">
                            <small className="text-uppercase text-secondary fw-bold px-3 d-block mb-1" style={{ fontSize: '0.75rem' }}>
                                Lesson Management
                            </small>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/instructor/lessons"
                                end
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 text-white ${isActive ? 'active bg-primary shadow-sm' : ''}`
                                }
                            >
                                <BsCardList size={18} /> All Lessons
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/instructor/lessons/create"
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 text-white ${isActive ? 'active bg-primary shadow-sm' : ''}`
                                }
                            >
                                <BsFileEarmarkPlus size={18} /> Add New Lesson
                            </NavLink>
                        </li>
                    </ul>

                    {/* User Profile Footer */}
                    <div className="border-top border-secondary pt-3 mt-auto d-flex align-items-center gap-2">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Avatar"
                            className="rounded-circle border"
                            width="40"
                            height="40"
                        />
                        <div className="overflow-hidden">
                            <strong className="d-block text-truncate text-white" style={{ fontSize: '0.9rem' }}>Teacher Name</strong>
                            <small className="text-muted text-truncate d-block">teacher@udemy.com</small>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area (<Outlet />) */}
                <main className="col-12 col-md-9 col-lg-10 p-4">
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default TeacherLayout;