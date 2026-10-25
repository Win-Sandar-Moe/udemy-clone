import { useState } from "react";
import { useParams } from "react-router-dom";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { LessonDto } from "../../course/dto/LessonDto.ts";
import { courseApiService } from "../../course/courseApiService.ts";

export default function CourseLessonForm() {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LessonDto>();

    const onSubmitHandler: SubmitHandler<LessonDto> = async (data) => {
        data.courseId = id;
        setIsSubmitting(true);
        setAlert(null);

        try {
            console.log(data);
            const response = await courseApiService.createCourseLessons(data);
            console.log(response);
            setAlert({ type: "success", message: "Lesson added successfully!" });
            reset();
        } catch (e) {
            console.error(e);
            setAlert({ type: "danger", message: "Failed to add lesson. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3">

                        {/* Header */}
                        <div className="card-header bg-white border-bottom py-3">
                            <h4 className="card-title mb-1 fw-bold text-dark">Add New Lesson</h4>
                            <p className="card-subtitle text-muted small">
                                {id ? `Attaching to Course ID: ${id}` : "Provide details for the new lesson"}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="card-body p-4">
                            {/* Alert Feedback */}
                            {alert && (
                                <div
                                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                                    role="alert"
                                >
                                    {alert.message}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setAlert(null)}
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                                {/* Lesson Name */}
                                <div className="mb-3">
                                    <label htmlFor="lessonName" className="form-label fw-semibold">
                                        Lesson Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lessonName"
                                        className={`form-control ${errors.lessonName ? "is-invalid" : ""}`}
                                        placeholder="e.g. Introduction to React Hooks"
                                        {...register("lessonName", { required: "Lesson title is required" })}
                                    />
                                    {errors.lessonName && (
                                        <div className="invalid-feedback">{errors.lessonName.message}</div>
                                    )}
                                </div>

                                {/* Video URL */}
                                <div className="mb-3">
                                    <label htmlFor="lessonVideoUrl" className="form-label fw-semibold">
                                        Video URL <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light text-muted">URL</span>
                                        <input
                                            type="url"
                                            id="lessonVideoUrl"
                                            className={`form-control ${errors.lessonVideoUrl ? "is-invalid" : ""}`}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            {...register("lessonVideoUrl", {
                                                required: "Video URL is required",
                                                pattern: {
                                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                                    message: "Please enter a valid URL"
                                                }
                                            })}
                                        />
                                        {errors.lessonVideoUrl && (
                                            <div className="invalid-feedback">{errors.lessonVideoUrl.message}</div>
                                        )}
                                    </div>
                                    <div className="form-text small">Provide a streaming or hosting link (e.g. YouTube, Vimeo).</div>
                                </div>

                                {/* Lesson Description */}
                                <div className="mb-4">
                                    <label htmlFor="lessonDescription" className="form-label fw-semibold">
                                        Lesson Description <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        id="lessonDescription"
                                        rows={4}
                                        className={`form-control ${errors.lessonDescription ? "is-invalid" : ""}`}
                                        placeholder="Briefly describe what this lesson covers..."
                                        {...register("lessonDescription", {
                                            required: "Lesson description is required",
                                            minLength: { value: 10, message: "Description should be at least 10 characters" }
                                        })}
                                    />
                                    {errors.lessonDescription && (
                                        <div className="invalid-feedback">{errors.lessonDescription.message}</div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-3"
                                        onClick={() => reset()}
                                        disabled={isSubmitting}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 fw-semibold d-inline-flex align-items-center"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Lesson"
                                        )}
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