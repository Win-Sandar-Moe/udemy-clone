
// react-icons/bs (Bootstrap Icons) နှင့် react-icons/fa (FontAwesome Icons) များ တင်သွင်းခြင်း
import {
    BsPlayBtnFill,
    BsStarFill,
    BsStarHalf,
    BsInfinity,
    BsCodeSlash,
    BsBriefcase,
    BsCpu,
    BsPalette,
    BsMegaphone,
    BsGraphUpArrow,
    BsSearch,
} from "react-icons/bs";
import {Link} from "react-router-dom";

// Featured Courses Data
const FEATURED_COURSES = [
    {
        id: 1,
        title: "Complete Python Bootcamp from Zero to Hero",
        instructor: "Jose Portilla",
        rating: 4.8,
        reviews: "482,120",
        price: "$19.99",
        originalPrice: "$84.99",
        badge: "Bestseller",
        badgeColor: "bg-warning text-dark",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 2,
        title: "The Web Developer Bootcamp: HTML, CSS, JS & Node",
        instructor: "Colt Steele",
        rating: 4.9,
        reviews: "264,800",
        price: "$14.99",
        originalPrice: "$74.99",
        badge: "Hot & New",
        badgeColor: "bg-danger",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 3,
        title: "Spring Boot 3 & Spring Framework 6 Masterclass",
        instructor: "Chad Darby",
        rating: 4.7,
        reviews: "95,430",
        price: "$16.99",
        originalPrice: "$69.99",
        badge: "Bestseller",
        badgeColor: "bg-warning text-dark",
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
    },
    {
        id: 4,
        title: "UI/UX Design Masterclass: Figma to Real Code",
        instructor: "Daniel Scott",
        rating: 4.8,
        reviews: "41,200",
        price: "$18.99",
        originalPrice: "$79.99",
        badge: "Popular",
        badgeColor: "bg-primary",
        img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60",
    },
];

// Top Categories with React Icons Components
const CATEGORIES = [
    { name: "Development", icon: <BsCodeSlash size={30} />, count: "1,200+ Courses" },
    { name: "Business", icon: <BsBriefcase size={30} />, count: "800+ Courses" },
    { name: "IT & Software", icon: <BsCpu size={30} />, count: "650+ Courses" },
    { name: "Design", icon: <BsPalette size={30} />, count: "500+ Courses" },
    { name: "Marketing", icon: <BsMegaphone size={30} />, count: "420+ Courses" },
    { name: "Data Science", icon: <BsGraphUpArrow size={30} />, count: "390+ Courses" },
];

export default function Home() {
    return (
        <main className="bg-light min-vh-100">
            {/* 1. Hero Section */}
            <section className="container py-4 py-lg-5">
                <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 p-4 p-md-5">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-semibold">
                Learn Without Limits
              </span>
                            <h1 className="display-5 fw-bold text-dark mb-3">
                                Skills that lead you forward
                            </h1>
                            <p className="text-secondary lead fs-6 mb-4">
                                Technology and the world of work change fast — with us, you’re faster.
                                Gain the skills to achieve your goals and stay competitive.
                            </p>
                            <div className="d-flex flex-wrap gap-2">
                                <div className="input-group" style={{ maxWidth: "420px" }}>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-2"
                                        placeholder="What do you want to learn?"
                                    />
                                    <button className="btn btn-primary px-4 fw-semibold d-flex align-items-center gap-2" type="button">
                                        <BsSearch />
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                                alt="Students collaborating"
                                className="img-fluid object-fit-cover w-100 h-100"
                                style={{ maxHeight: "400px" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Value Propositions Bar */}
            <section className="container mb-5">
                <div className="row g-4 text-center">
                    <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-center gap-3 p-3 bg-white rounded-3 shadow-sm border">
                            <div className="text-primary d-flex align-items-center">
                                <BsPlayBtnFill size={42} />
                            </div>
                            <div className="text-start">
                                <h6 className="fw-bold mb-0">Over 210,000 courses</h6>
                                <small className="text-muted">Explore fresh topics every month</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-center gap-3 p-3 bg-white rounded-3 shadow-sm border">
                            <div className="text-warning d-flex align-items-center">
                                <BsStarFill size={38} />
                            </div>
                            <div className="text-start">
                                <h6 className="fw-bold mb-0">Expert Instructors</h6>
                                <small className="text-muted">Learn from industry practitioners</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-center gap-3 p-3 bg-white rounded-3 shadow-sm border">
                            <div className="text-success d-flex align-items-center">
                                <BsInfinity size={42} />
                            </div>
                            <div className="text-start">
                                <h6 className="fw-bold mb-0">Lifetime Access</h6>
                                <small className="text-muted">Learn at your own pace anytime</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Featured Courses Section */}
            <section className="container mb-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">A broad selection of courses</h2>
                        <p className="text-secondary mb-0">Choose from top online video courses with new additions added daily</p>
                    </div>
                    <Link to="/courses" className="btn btn-outline-dark fw-semibold d-none d-md-inline-block">
                        Explore All
                    </Link>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                    {FEATURED_COURSES.map((course) => (
                        <div className="col" key={course.id}>
                            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden d-flex flex-column">
                                <div className="position-relative">
                                    <img
                                        src={course.img}
                                        className="card-img-top object-fit-cover"
                                        alt={course.title}
                                        style={{ height: "160px" }}
                                    />
                                    <span
                                        className={`badge position-absolute top-0 start-0 m-2 ${course.badgeColor}`}
                                    >
                    {course.badge}
                  </span>
                                </div>
                                <div className="card-body d-flex flex-column p-3">
                                    <h6 className="card-title fw-bold text-dark mb-1" style={{ minHeight: "2.5rem" }}>
                                        {course.title}
                                    </h6>
                                    <p className="text-muted small mb-2">{course.instructor}</p>

                                    {/* Rating */}
                                    <div className="d-flex align-items-center gap-1 mb-2">
                                        <span className="fw-bold text-warning small">{course.rating}</span>
                                        <div className="text-warning small d-flex gap-1">
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarFill />
                                            <BsStarHalf />
                                        </div>
                                        <span className="text-muted small">({course.reviews})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-auto d-flex align-items-center gap-2">
                                        <span className="fs-5 fw-bold text-dark">{course.price}</span>
                                        <span className="text-muted text-decoration-line-through small">
                      {course.originalPrice}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Top Categories */}
            <section className="container mb-5">
                <h3 className="fw-bold mb-4">Top Categories</h3>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
                    {CATEGORIES.map((cat, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 text-center p-3 border border-light-subtle rounded-3 shadow-sm bg-white">
                                <div className="p-3 bg-light rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-2 text-primary">
                                    {cat.icon}
                                </div>
                                <h6 className="fw-semibold mb-1 text-dark">{cat.name}</h6>
                                <small className="text-secondary">{cat.count}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Become an Instructor CTA */}
            <section className="container py-4 mb-5">
                <div className="bg-dark text-white p-4 p-md-5 rounded-4 shadow">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h2 className="fw-bold mb-2">Become an instructor</h2>
                            <p className="text-secondary-emphasis mb-md-0">
                                Instructors from around the world teach millions of learners on our platform.
                                We provide the tools and skills to teach what you love.
                            </p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <Link to="/teacher/dashboard" className="btn btn-light btn-lg px-4 fw-bold">
                                Start Teaching Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
