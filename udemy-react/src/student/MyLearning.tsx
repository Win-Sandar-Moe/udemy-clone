import useEnrolledCourses from "./hook/useEnrolledCourses.tsx";
import type {CourseInfoDto} from "../course/dto/CourseInfoDto.ts";


export default function MyLearning() {
    const { courses } = useEnrolledCourses();

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                <div>
                    <h1 className="fw-bold mb-1">My Learning</h1>
                    <p className="text-muted mb-0">Continue where you left off</p>
                </div>
                <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
          {courses?.length || 0} Enrolled
        </span>
            </div>

            {/* Empty State */}
            {(!courses || courses.length === 0) ? (
                <div className="text-center py-5 border rounded-3 bg-light">
                    <h4 className="fw-semibold text-secondary">No courses enrolled yet</h4>
                    <p className="text-muted mb-0">Browse available courses to start learning.</p>
                </div>
            ) : (
                /* Course Grid */
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {courses.map((course: CourseInfoDto) => (
                        <div className="col" key={course.courseId}>
                            <div className="card h-100 border-0 shadow-sm overflow-hidden">
                                {/* Thumbnail */}
                                <div className="ratio ratio-16x9 bg-secondary-subtle">
                                    <img
                                        src={
                                            course.imageBase64.startsWith("data:")
                                                ? course.imageBase64
                                                : `data:image/jpeg;base64,${course.imageBase64}`
                                        }
                                        alt={course.title}
                                        className="card-img-top object-fit-cover"
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="card-body d-flex flex-column p-4">
                                    <div className="mb-2">
                    <span className="badge bg-light text-primary border border-primary-subtle text-uppercase fw-semibold">
                      {course.categoryName}
                    </span>
                                    </div>

                                    <h5 className="card-title fw-bold text-truncate mb-2" title={course.title}>
                                        {course.title}
                                    </h5>

                                    <p className="card-text text-muted small flex-grow-1 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="d-flex align-items-center small text-secondary mt-3 pt-3 border-top">
                                        <span>Instructor: <strong className="text-dark">{course.teacherName}</strong></span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
                                    <a
                                        href={`/courses/${course.courseId}/learn`}
                                        className="btn btn-primary w-100 fw-semibold d-flex justify-content-center align-items-center gap-2"
                                    >
                                        <span>Start Learning</span>
                                        <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}