
import useAllCourses from "../../course/hook/useAllCourses.tsx";
import type {CourseInfoDto} from "../../course/dto/CourseInfoDto.ts";
import {Link} from "react-router-dom";


export default function CourseTable() {
    const { courses } = useAllCourses();



    return (
        <div className="container my-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="card-title fw-bold mb-0">Course Directory</h4>
                        <small className="text-muted">Manage courses and lesson content</small>
                    </div>
                    <span className="badge bg-primary rounded-pill px-3 py-2">
            {courses?.length || 0} Total Courses
          </span>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                        <tr className="text-uppercase small text-secondary">
                            <th scope="col" style={{ width: "80px" }}>Preview</th>
                            <th scope="col">Course Details</th>
                            <th scope="col">Category</th>
                            <th scope="col">Instructor</th>
                            <th scope="col" className="text-end">Fee</th>
                            <th scope="col" className="text-center" style={{ width: "160px" }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses && courses.length > 0 ? (
                            courses.map((course: CourseInfoDto) => (
                                <tr key={course.courseId}>
                                    {/* Thumbnail Image */}
                                    <td>
                                        {course.imageBase64 ? (
                                            <img
                                                src={course.imageBase64.startsWith("data:") ? course.imageBase64 : `data:image/jpeg;base64,${course.imageBase64}`}
                                                alt={course.title}
                                                className="rounded object-fit-cover shadow-sm"
                                                style={{ width: "56px", height: "40px" }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded bg-light text-muted d-flex align-items-center justify-content-center small border"
                                                style={{ width: "56px", height: "40px" }}
                                            >
                                                N/A
                                            </div>
                                        )}
                                    </td>

                                    {/* Title & Description */}
                                    <td>
                                        <div className="fw-semibold text-dark">{course.title}</div>
                                        <div
                                            className="text-muted small text-truncate"
                                            style={{ maxWidth: "320px" }}
                                            title={course.description}
                                        >
                                            {course.description}
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td>
                      <span className="badge bg-info bg-opacity-10 text-info border border-info-subtle rounded-pill">
                        {course.categoryName}
                      </span>
                                    </td>

                                    {/* Instructor */}
                                    <td className="text-secondary small fw-medium">
                                        {course.teacherName}
                                    </td>

                                    {/* Fee */}
                                    <td className="text-end fw-bold text-dark">
                                        ${course.fees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>

                                    {/* Action: Add Lessons Button */}
                                    <td className="text-center">
                                        <Link
                                            to={`/teacher/dashboard/create-lesson/${course.courseId}`}
                                            className="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-sm"
                                        >
                                            <span className="fw-semibold">+ Add Lessons</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-5 text-muted">
                                    <p className="mb-0 fw-semibold">No courses found.</p>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}