import { useAuthStore } from "../auth/store/useAuthStore.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { LoginRequest } from "../auth/dto/LoginRequest.ts";
import { loginApiCall } from "../auth/api/AuthApi.ts";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<LoginRequest>();
    const navigator = useNavigate();

    const onSubmitHandler: SubmitHandler<LoginRequest> = async (data) => {
        try {

            const response = await loginApiCall(data);

            setAuth(response.accessToken, response.refreshToken);
            reset();
            navigator("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <h3 className="fw-bold">Sign In</h3>
                            <p className="text-muted small">Enter your credentials to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="mb-3">
                                <label htmlFor="usernameEmail" className="form-label fw-semibold">
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    id="usernameEmail"
                                    className="form-control form-control-lg"
                                    placeholder="name@example.com"
                                    autoComplete="username"
                                    required
                                    {...register("usernameEmail", { required: true })}
                                />
                            </div>

                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <label htmlFor="password" className="form-label fw-semibold mb-0">
                                        Password
                                    </label>
                                    <a href="#" className="text-decoration-none small text-primary">
                                        Forgot?
                                    </a>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    required
                                    {...register("password", { required: true })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary btn-lg w-100 fw-semibold"
                            >
                                {isSubmitting ? (
                                    <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                                        Signing in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}