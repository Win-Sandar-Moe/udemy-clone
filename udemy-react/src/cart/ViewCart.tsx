
import { useCourseCartStore } from "./store/useCourseCartStore";
import {StudentApiService} from "../student/api/StudentApiService.ts";



export default function ViewCart() {
    const { cart, removeFromCart, clearCart, getTotalPrice, getTotalCount } =
        useCourseCartStore();

    const totalPrice = getTotalPrice();
    const totalCount = getTotalCount();
    const originalPrice = totalPrice * 1.3;
    const discountAmount = originalPrice - totalPrice;

    const checkOutHandler = async () => {
        const coursesIds =
            cart.map((course) => course.courseId);
            try{
                const successString=await StudentApiService.enrollCourse(coursesIds);
                console.log(successString);
                clearCart();
            }catch (e){
                console.log(e);
            }
    }

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm border-0 py-5 px-4 mx-auto" style={{ maxWidth: "500px" }}>
                    <div className="card-body">
                        <div className="display-4 text-muted mb-3">
                            <i className="bi bi-cart-x"></i>
                        </div>
                        <h3 className="card-title fw-semibold">Your cart is empty</h3>
                        <p className="text-muted mb-4">
                            Looks like you haven't added any courses to your cart yet.
                        </p>
                        <a href="/courses" className="btn btn-primary px-4 py-2">
                            Explore Courses
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                <div>
                    <h1 className="h3 fw-bold mb-1">Shopping Cart</h1>
                    <p className="text-muted mb-0">{totalCount} {totalCount === 1 ? "course" : "courses"} in your cart</p>
                </div>
                <button
                    onClick={clearCart}
                    className="btn btn-outline-danger btn-sm px-3"
                >
                    Clear Cart
                </button>
            </div>

            <div className="row g-4">
                {/* Course Items List */}
                <div className="col-lg-8">
                    <div className="d-flex flex-column gap-3">
                        {cart.map((course) => (
                            <div
                                key={course.courseId}
                                className="card border-0 shadow-sm overflow-hidden"
                            >
                                <div className="row g-0 align-items-center">
                                    {/* Course Thumbnail */}
                                    <div className="col-md-3">
                                        <img
                                            src={
                                                course.imageBase64.startsWith("data:")
                                                    ? course.imageBase64
                                                    : `data:image/jpeg;base64,${course.imageBase64}`
                                            }
                                            alt={course.title}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                            style={{ minHeight: "130px", maxHeight: "150px" }}
                                        />
                                    </div>

                                    {/* Course Details */}
                                    <div className="col-md-9">
                                        <div className="card-body d-flex flex-column justify-content-between h-100">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                                                    <h2 className="h6 fw-bold mb-0 text-truncate">
                                                        {course.title}
                                                    </h2>
                                                    <span className="fw-bold fs-5 text-primary">
                            ${course.fees.toFixed(2)}
                          </span>
                                                </div>

                                                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                          <span className="badge bg-secondary-subtle text-secondary-emphasis">
                            {course.categoryName}
                          </span>
                                                    <small className="text-muted">
                                                        Instructor: <span className="fw-medium text-dark">{course.teacherName}</span>
                                                    </small>
                                                </div>

                                                <p className="card-text text-muted small text-truncate mb-2" style={{ maxWidth: "520px" }}>
                                                    {course.description}
                                                </p>
                                            </div>

                                            <div className="text-end">
                                                <button
                                                    onClick={() => removeFromCart(course.courseId)}
                                                    className="btn btn-link text-danger p-0 text-decoration-none small"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm p-3 sticky-top" style={{ top: "1.5rem" }}>
                        <div className="card-body">
                            <h2 className="h5 fw-bold mb-4">Order Summary</h2>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Original Price</span>
                                <span className="text-muted text-decoration-line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Discount (~30%)</span>
                                <span className="text-success fw-medium">
                  -${discountAmount.toFixed(2)}
                </span>
                            </div>

                            <hr className="my-3" />

                            <div className="d-flex justify-content-between align-items-baseline mb-4">
                                <span className="fw-bold fs-5">Total</span>
                                <span className="fw-bold fs-4 text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
                            </div>

                            <button onClick={checkOutHandler} className="btn btn-primary w-100 py-2 fw-semibold shadow-sm mb-2">
                                Proceed to Checkout
                            </button>

                            <p className="text-center text-muted small mb-0">
                                30-day money-back guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
