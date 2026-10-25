import React from "react";
import {useAuthStore} from "../auth/store/useAuthStore.tsx";
import {AiOutlineSearch, AiOutlineShopping} from "react-icons/ai";
import {BiLogOut} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";
import {useCourseCartStore} from "../cart/store/useCourseCartStore.tsx";


export default function Header() {
    const { user, isAuthenticated, clearAuth } = useAuthStore();
    const navigator = useNavigate();
    const {getTotalCount} = useCourseCartStore();

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        clearAuth();
        navigator("/login");
    };

    return (
        <header className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top px-3 py-2">
            <div className="container-fluid gap-3">
                {/* Brand Logo */}
                <a className="navbar-brand fw-bold fs-3 text-dark text-decoration-none" href="/">
                    <span className="text-danger">U</span>demy
                </a>

                {/* Categories Link */}
                <div className="dropdown d-none d-md-block">
                    <button
                        className="btn btn-link text-secondary text-decoration-none dropdown-toggle px-2"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        Categories
                    </button>
                    <ul className="dropdown-menu shadow border-0">
                        <li><a className="dropdown-item py-2" href="#">Development</a></li>
                        <li><a className="dropdown-item py-2" href="#">Business</a></li>
                        <li><a className="dropdown-item py-2" href="#">IT & Software</a></li>
                        <li><a className="dropdown-item py-2" href="#">Design</a></li>
                    </ul>
                </div>

                {/* Search Bar */}
                <form className="flex-grow-1 d-none d-sm-block position-relative">
                    <div className="input-group">
            <span className="input-group-text bg-light border-dark-subtle rounded-start-pill ps-3">
              <AiOutlineSearch className="text-muted"  size={20}/>
            </span>
                        <input
                            type="search"
                            className="form-control bg-light border-dark-subtle rounded-end-pill py-2"
                            placeholder="Search for anything..."
                            aria-label="Search"
                        />
                    </div>
                </form>

                {/* Right Navigation Controls */}
                <div className="d-flex align-items-center gap-2 ms-auto">
                    {/* Quick Links */}
                    <a href="#" className="btn btn-link text-secondary text-decoration-none d-none d-xl-inline">
                        Udemy Business
                    </a>
                    <a href="#" className="btn btn-link text-secondary text-decoration-none d-none d-lg-inline">
                        Teach on Udemy
                    </a>

                    {/* Cart Icon */}
                    <Link to="/cart" className="btn btn-link text-dark position-relative p-2 text-decoration-none" title="Cart">
                        <AiOutlineShopping className="text-muted" size={20}/>
                        <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
              {getTotalCount()}
            </span>
                    </Link>

                    {/* Auth State Conditional Rendering */}
                    {isAuthenticated ? (
                        <div className="dropdown">
                            <button
                                className="btn d-flex align-items-center gap-2 p-0 border-0 dropdown-toggle text-decoration-none"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {/* User Avatar Circle */}
                                <div
                                    className="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px" }}
                                >
                                    {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                                </div>
                            </button>

                            {/* Profile Dropdown Menu */}
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-3" style={{ minWidth: "220px" }}>
                                <li className="d-flex align-items-center gap-2 pb-2 border-bottom mb-2">
                                    <div
                                        className="rounded-circle bg-dark text-white fw-bold d-flex align-items-center justify-content-center"
                                        style={{ width: "36px", height: "36px" }}
                                    >
                                        {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-truncate" style={{ maxWidth: "140px" }}>
                                            {user?.username}
                                        </div>
                                        {user?.roles && (
                                            <small className="text-muted d-block">
                                                {Array.isArray(user.roles) ? user.roles.join(", ") : user.roles}
                                            </small>
                                        )}
                                    </div>
                                </li>
                                <li><Link className="dropdown-item rounded py-2" to="/my-learning">My learning</Link></li>
                                <li><a className="dropdown-item rounded py-2" href="#">Wishlist</a></li>
                                <li><a className="dropdown-item rounded py-2" href="#">Account settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button
                                        className="dropdown-item rounded py-2 text-danger fw-semibold d-flex align-items-center gap-2"
                                        onClick={handleLogout}
                                    >
                                        <BiLogOut size={20} className="text-danger me-2"/> Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* Guest Buttons */
                        <div className="d-flex align-items-center gap-2">
                            <Link
                               to="/login"
                                className="btn btn-outline-dark fw-semibold px-3 py-2 rounded-1 text-decoration-none"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-dark fw-semibold px-3 py-2 rounded-1 text-decoration-none"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
