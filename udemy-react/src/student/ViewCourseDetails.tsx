import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAllCoursesAllCategories from "../course/hook/useAllCoursesAllCategories.tsx";
import type {CourseInfoDto} from "../course/dto/CourseInfoDto.ts";
import {useCourseCartStore} from "../cart/store/useCourseCartStore.tsx";



export default function ViewCourseDetails() {
    const { id } = useParams();
    const { courses } = useAllCoursesAllCategories();

    const {isInCart,addToCart} = useCourseCartStore();
    const beInCart = isInCart(id as string);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const course = courses?.find((c: CourseInfoDto) => c.courseId === id);

    const handleAddToCart = () => {
        if(!beInCart){
            addToCart(course!);
        }
        setToastMessage(`"${course?.title}" added to your cart!`);
        setTimeout(() => setToastMessage(null), 3500);
    };

    if (!course) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm border-0 p-5 rounded-4 max-w-lg mx-auto">
                    <h3 className="fw-bold text-dark mb-2">Course Not Found</h3>
                    <p className="text-muted mb-4">
                        The course you are looking for does not exist or has been removed.
                    </p>
                    <div>
                        <Link to="/courses" className="btn btn-primary rounded-pill px-4">
                            ← Browse All Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
                    <div className="toast show align-items-center text-bg-success border-0 shadow" role="alert">
                        <div className="d-flex">
                            <div className="toast-body fw-medium">{toastMessage}</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setToastMessage(null)}
                            ></button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Breadcrumb & Navigation */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item">
                            <Link to="/courses" className="text-decoration-none">Courses</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {course.categoryName || "General"}
                        </li>
                    </ol>
                </nav>
                <Link to="/courses" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                    ← Browse All Courses
                </Link>
            </div>

            <div className="row g-4">
                {/* Main Content (Left Column) */}
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                        {/* Course Banner Image */}
                        <div className="position-relative" style={{ maxHeight: "380px", overflow: "hidden" }}>
                            {course.imageBase64 ? (
                                <img
                                    src={
                                        course.imageBase64.startsWith("data:")
                                            ? course.imageBase64
                                            : `data:image/jpeg;base64,${course.imageBase64}`
                                    }
                                    alt={course.title}
                                    className="w-100 object-fit-cover"
                                    style={{ maxHeight: "380px" }}
                                />
                            ) : (
                                <div className="bg-secondary-subtle d-flex align-items-center justify-content-center py-5 text-muted">
                                    No Cover Image Available
                                </div>
                            )}
                            <span className="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm">
                {course.categoryName}
              </span>
                        </div>

                        {/* Course Header Info */}
                        <div className="card-body p-4">
                            <h1 className="fw-bold text-dark mb-3">{course.title}</h1>

                            <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small mb-4 pb-3 border-bottom">
                                <div>
                                    <span className="fw-semibold text-dark">Instructor: </span>
                                    {course.teacherName}
                                </div>
                                <div>•</div>
                                <div>
                                    <span className="fw-semibold text-dark">Access: </span> Full Lifetime
                                </div>
                                <div>•</div>
                                <div>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                    Self-Paced
                  </span>
                                </div>
                            </div>

                            {/* Course Description */}
                            <h5 className="fw-bold text-dark mb-3">About This Course</h5>
                            <p className="text-secondary lh-lg" style={{ whiteSpace: "pre-line" }}>
                                {course.description}
                            </p>

                            {/* What You'll Learn Highlights */}
                            <div className="bg-light p-4 rounded-3 mt-4 border border-light-subtle">
                                <h6 className="fw-bold text-dark mb-3">What You Will Learn</h6>
                                <div className="row g-2 small text-secondary">
                                    <div className="col-12 col-md-6">✓ Practical real-world project skills</div>
                                    <div className="col-12 col-md-6">✓ Hands-on coding exercises and lessons</div>
                                    <div className="col-12 col-md-6">✓ Direct instructor Q&amp;A support</div>
                                    <div className="col-12 col-md-6">✓ Certificate upon completion</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Sidebar / Pricing Card (Right Column) */}
                <div className="col-12 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "2rem" }}>
                        <span className="text-muted small text-uppercase fw-bold">Course Tuition</span>
                        <div className="d-flex align-items-baseline gap-2 my-2">
              <span className="display-6 fw-bold text-primary">
                ${course.fees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
                            <span className="text-muted small text-decoration-line-through">
                ${(course.fees * 1.3).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
                        </div>
                        <span className="badge bg-danger-subtle text-danger align-self-start mb-3 rounded-pill px-2.5 py-1">
              Save 30% Today
            </span>

                        {/* CTA Buttons */}
                        <div className="d-grid gap-2 mb-3">
                            <button
                                type="button"
                                className={`btn btn-lg rounded-pill fw-semibold ${
                                    beInCart ? "btn-secondary opacity-75" : "btn-primary shadow-sm"
                                }`}
                                onClick={handleAddToCart}
                                disabled={beInCart}
                            >
                                {beInCart ? "✓ Added to Cart" : "Add to Cart"}
                            </button>
                            <Link to="/courses" className="btn btn-outline-secondary rounded-pill">
                                Browse More Courses
                            </Link>
                        </div>

                        <p className="text-center text-muted small mb-4">
                            30-day money-back guarantee • Instant access
                        </p>

                        {/* Summary Inclusions */}
                        <div className="border-top pt-3">
                            <h6 className="fw-bold text-dark small mb-3">This course includes:</h6>
                            <ul className="list-unstyled small text-secondary d-grid gap-2 mb-0">
                                <li className="d-flex align-items-center">
                                    <span className="me-2 text-primary">📹</span> On-demand video lectures
                                </li>
                                <li className="d-flex align-items-center">
                                    <span className="me-2 text-primary">📂</span> Downloadable source resources
                                </li>
                                <li className="d-flex align-items-center">
                                    <span className="me-2 text-primary">📱</span> Mobile and desktop access
                                </li>
                                <li className="d-flex align-items-center">
                                    <span className="me-2 text-primary">🏆</span> Certificate of completion
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}