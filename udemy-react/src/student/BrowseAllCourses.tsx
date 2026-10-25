import { useState } from "react";
import { Link } from "react-router-dom";
import useAllCoursesAllCategories from "../course/hook/useAllCoursesAllCategories.tsx";
import type {CourseInfoDto} from "../course/dto/CourseInfoDto.ts";
import {useCourseCartStore} from "../cart/store/useCourseCartStore.tsx";


export default function BrowseAllCourses() {
    const { courses } = useAllCoursesAllCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const {addToCart,cart,isInCart} = useCourseCartStore();
    // Extract unique categories for filter tabs
    const categories = ["All", ...new Set(courses?.map((c: CourseInfoDto) => c.categoryName).filter(Boolean))];

    // Filtering logic
    const filteredCourses = courses?.filter((course: CourseInfoDto) => {
        const matchesCategory = selectedCategory === "All" || course.categoryName === selectedCategory;
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (course: CourseInfoDto) => {
            addToCart(course);
            showNotification(`Added "${course.title}" to cart!`);
    };

    const showNotification = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="container py-5">
            {/* Toast Alert */}
            {toastMessage && (
                <div
                    className="position-fixed top-0 end-0 p-3"
                    style={{ zIndex: 1055 }}
                >
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

            {/* Header Banner */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-6">
                    <h2 className="fw-bold text-dark mb-1">Explore Courses</h2>
                    <p className="text-muted mb-0">Expand your skills with our curated industry programs</p>
                </div>
                <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-6 px-3 py-2 rounded-pill">
            Cart ({cart.length})
          </span>
                </div>
            </div>

            {/* Search & Category Filter Controls */}
            <div className="row g-3 mb-5 align-items-center">
                <div className="col-12 col-md-5">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 text-muted">🔍</span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Search by title or instructor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-7">
                    <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`btn btn-sm rounded-pill px-3 transition ${
                                    selectedCategory === cat ? "btn-primary shadow-sm" : "btn-outline-secondary"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="row g-4">
                {filteredCourses && filteredCourses.length > 0 ? (
                    filteredCourses.map((course: CourseInfoDto) => {
                        const inCart = isInCart(course.courseId);

                        return (
                            <div key={course.courseId} className="col-12 col-sm-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column">

                                    {/* Thumbnail / Image with Category Overlay */}
                                    <div className="position-relative" style={{ height: "190px" }}>
                                        {course.imageBase64 ? (
                                            <img
                                                src={
                                                    course.imageBase64.startsWith("data:")
                                                        ? course.imageBase64
                                                        : `data:image/jpeg;base64,${course.imageBase64}`
                                                }
                                                alt={course.title}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        ) : (
                                            <div className="w-100 h-100 bg-secondary-subtle d-flex align-items-center justify-content-center text-muted">
                                                No Preview Available
                                            </div>
                                        )}
                                        <span className="badge bg-white text-dark shadow-sm position-absolute top-0 start-0 m-3 rounded-pill px-2.5 py-1.5 fw-semibold small">
                      {course.categoryName || "General"}
                    </span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="card-body d-flex flex-column p-4">
                                        {/* Instructor */}
                                        <div className="text-muted small fw-medium mb-1">
                                            Instructor: <span className="text-dark">{course.teacherName}</span>
                                        </div>

                                        {/* Title */}
                                        <h5 className="card-title fw-bold text-dark text-truncate mb-2" title={course.title}>
                                            {course.title}
                                        </h5>

                                        {/* Description (Clamped to 2 lines) */}
                                        <p
                                            className="card-text text-secondary small mb-3"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {course.description}
                                        </p>

                                        {/* Price & Actions pinned to bottom */}
                                        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-muted small">Tuition Fee</span>
                                            <span className="fs-5 fw-bold text-primary">
                        ${course.fees.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="d-grid gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleAddToCart(course)}
                                                disabled={inCart}
                                                className={`btn rounded-pill fw-semibold ${
                                                    inCart ? "btn-secondary opacity-75" : "btn-primary shadow-sm"
                                                }`}
                                            >
                                                {inCart ? "✓ In Cart" : "+ Add to Cart"}
                                            </button>

                                            <Link
                                                to={`/courses/${course.courseId}`}
                                                className="btn btn-outline-secondary rounded-pill btn-sm fw-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 py-5 text-center">
                        <div className="text-muted">
                            <h5 className="fw-semibold">No courses match your criteria</h5>
                            <p className="small">Try resetting your filters or search terms.</p>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary rounded-pill px-3"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}