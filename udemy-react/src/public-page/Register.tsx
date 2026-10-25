import {useState} from "react";
import {type RegisterDto, StudentEducation, UserType} from "../auth/dto/RegisterDto";
import {type SubmitHandler, useForm} from "react-hook-form";
import {registerApiCall} from "../auth/api/AuthApi.ts";
import {useNavigate} from "react-router-dom";


export default function Register() {
    const [userRole, setUserRole] = useState<UserType>(UserType.STUDENT);
    const navigator=useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,

        formState: { errors, isSubmitting },
    } = useForm<RegisterDto>({
        defaultValues: {
            userType: UserType.STUDENT,
        },
    });

    const handleRoleChange = (role: UserType) => {

        setUserRole(role);
        setValue("userType", role);
    };

    const onSubmitHandler: SubmitHandler<RegisterDto> = async (data) => {
        // Teacher သို့မဟုတ် Student မဟုတ်သည့် field များကို clear လုပ်နိုင်သည်
        const formattedData = {

            ...data,
            ...(userRole === UserType.STUDENT
                ? { teacherEducation: undefined, skills: undefined }
                : { studentEducation: undefined }),
        };

        console.log("Submitted Data:", formattedData);
      try{
          const response=  await registerApiCall(formattedData);
          reset();
          console.log(response);
          navigator("/login")


      }
      catch(error){
          console.log(error);
      }
        // API Call logic here
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="text-center fw-bold text-primary mb-4">
                                Create an Account
                            </h2>

                            {/* User Type Toggle Buttons */}
                            <div className="mb-4">
                                <label className="form-label d-block text-muted small fw-semibold text-center mb-2">
                                    REGISTER AS
                                </label>
                                <div
                                    className="btn-group w-100"
                                    role="group"
                                    aria-label="User role selection"
                                >
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        id="roleStudent"
                                        autoComplete="off"
                                        checked={userRole === UserType.STUDENT}
                                        onChange={() => handleRoleChange(UserType.STUDENT)}
                                    />
                                    <label
                                        className="btn btn-outline-primary py-2 fw-semibold"
                                        htmlFor="roleStudent"
                                    >
                                        Student
                                    </label>

                                    <input
                                        type="radio"
                                        className="btn-check"
                                        id="roleTeacher"
                                        autoComplete="off"
                                        checked={userRole === UserType.TEACHER}
                                        onChange={() => handleRoleChange(UserType.TEACHER)}
                                    />
                                    <label
                                        className="btn btn-outline-primary py-2 fw-semibold"
                                        htmlFor="roleTeacher"
                                    >
                                        Teacher
                                    </label>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                                {/* Username */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                        placeholder="e.g. john_doe"
                                        {...register("username", { required: "Username is required" })}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username.message}
                                        </div>
                                    )}
                                </div>
                               {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Email address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        placeholder="name@example.com"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email format",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 4,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                {/* Address (Optional) */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="City, Street, etc."
                                        {...register("address")}
                                    />
                                </div>

                                <hr className="my-4 text-secondary opacity-25" />

                                {/* Conditional Fields: Student */}
                                {userRole === UserType.STUDENT && (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Student Education Level
                                        </label>
                                        <select
                                            className="form-select"
                                            {...register("studentEducation")}
                                        >
                                            <option value={StudentEducation.HIGH_SCHOOL}>
                                                High School
                                            </option>
                                            <option value={StudentEducation.UNDERGRADUATE}>
                                                Undergraduate
                                            </option>
                                            <option value={StudentEducation.GRADUATE}>Graduate</option>
                                            <option value={StudentEducation.DOCTORATE}>
                                                Doctorate
                                            </option>
                                        </select>
                                    </div>
                                )}

                                {/* Conditional Fields: Teacher */}
                                {userRole === UserType.TEACHER && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Teacher Education / Degree
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g. M.Sc. in Computer Science"
                                                {...register("teacherEducation")}
                                            />
                                        </div>
                                         <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Skills
                                        </label>
                                        <div className="row g-2">
                                            {["JavaScript", "React", "Node.js", "Python"].map(
                                                (skill) => (
                                                    <div className="col-6" key={skill}>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`skill-${skill}`}
                                                                value={skill}
                                                                {...register("skills")}
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor={`skill-${skill}`}
                                                            >
                                                                {skill}
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    </>
                                )}

                                <div className="d-grid mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg shadow-sm"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registering..." : "Complete Registration"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}