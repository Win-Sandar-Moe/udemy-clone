




export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25">
            <div className="container-fluid px-4 px-md-5">
                {/* Top Section: Links & Language Selector */}
                <div className="row gy-4 mb-4">
                    {/* Column 1 */}
                    <div className="col-6 col-md-3">
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Udemy Business
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Teach on Udemy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Get the app
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="col-6 col-md-3">
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Help and Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Affiliate
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Investors
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="col-6 col-md-3">
                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Cookie settings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Sitemap
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white-50 text-decoration-none small text-hover-white">
                                    Accessibility statement
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Language Button */}
                    <div className="col-6 col-md-3 text-md-end">
                        <button className="btn btn-outline-light d-inline-flex align-items-center gap-2 px-3 py-2 rounded-1">
                            <i className="bi bi-globe"></i>
                            <span>English</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section: Logo & Copyright */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 border-top border-secondary border-opacity-25 gap-3">
                    {/* Logo */}
                    <div>
                        <a href="/" className="navbar-brand fw-bold fs-3 text-white text-decoration-none">
                            <span className="text-danger">U</span>demy
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-white-50 small text-center text-md-end">
                        &copy; {new Date().getFullYear()} Udemy, Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}