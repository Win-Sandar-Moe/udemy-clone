import {type FormEvent, useState} from "react";
import useAllCategories from "../../course/hook/useAllCategories.tsx";
import { teacherApiService } from "../api/teacherApiService.ts";


export default function CourseForm() {
    const { categories } = useAllCategories();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const courseCreateHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const target = form.elements as typeof form.elements & {
            title: HTMLInputElement;
            description: HTMLTextAreaElement;
            categoryName: HTMLSelectElement;
            fees: HTMLInputElement;
            image: HTMLInputElement;
        };

        const formData = new FormData();
        formData.append("title", target.title.value);
        formData.append("description", target.description.value);
        formData.append("categoryName", target.categoryName.value);
        formData.append("fees", target.fees.value);

        if (target.image.files && target.image.files[0]) {
            formData.append("image", target.image.files[0]);
        }

        try {
            const response = await teacherApiService.createCourse(formData);
            console.log(response);
            form.reset();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        /* container-fluid နှင့် p-4 / p-md-5 သုံးထားသဖြင့် ဘေး space အပြည့် အချိုးကျ ကျယ်သွားပါမည် */
        <div className="container-fluid py-4 px-4 px-lg-5">
            <div className="card border-0 shadow-sm rounded-3">
                <div className="card-header bg-white border-bottom py-3 px-4">
                    <h4 className="card-title fw-bold mb-1">Create New Course</h4>
                    <p className="text-muted small mb-0">
                        Fill in the details below to publish your new course.
                    </p>
                </div>

                <div className="card-body p-4 p-md-5">
                    <form onSubmit={courseCreateHandler}>
                        {/* Course Title */}
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label fw-semibold">
                                Course Title <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                placeholder="e.g. Complete Web Development Bootcamp"
                                className="form-control form-control-lg fs-6"
                            />
                            <div className="form-text">
                                Write a clear, catchy title that includes keywords students might search for.
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="form-label fw-semibold">
                                Course Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                required
                                placeholder="Insert your course overview, objectives, and prerequisites..."
                                className="form-control"
                            />
                            <div className="form-text">
                                Highlight key learning outcomes, target audience, and main topics.
                            </div>
                        </div>

                        {/* Category & Price Grid */}
                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <label htmlFor="categoryName" className="form-label fw-semibold">
                                    Category <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="categoryName"
                                    name="categoryName"
                                    required
                                    defaultValue=""
                                    className="form-select form-select-lg fs-6"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.categoryName}>
                                            {cat.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="fees" className="form-label fw-semibold">
                                    Course Fee <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        id="fees"
                                        name="fees"
                                        min="0"
                                        step="0.01"
                                        required
                                        placeholder="19.99"
                                        className="form-control form-control-lg fs-6"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Cover Image Upload */}
                        <div className="mb-4">
                            <label htmlFor="image" className="form-label fw-semibold">
                                Course Thumbnail / Image <span className="text-danger">*</span>
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                required
                                className="form-control"
                            />
                            <div className="form-text">
                                Upload a 16:9 ratio image (e.g. 1280x720 px, JPG or PNG).
                            </div>
                        </div>

                        <hr className="my-4 text-muted" />

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={(e) => (e.currentTarget.form as HTMLFormElement)?.reset()}
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary px-4 fw-semibold"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save & Continue"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}