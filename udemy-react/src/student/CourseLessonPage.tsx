import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCourseLessons from "../course/hook/useCourseLessons.tsx";
import useAllCoursesAllCategories from "../course/hook/useAllCoursesAllCategories.tsx";
import type { CourseInfoDto } from "../course/dto/CourseInfoDto.ts";
import type { LessonDto } from "../course/dto/LessonDto.ts";

export function CourseLessonPage() {
    const { id } = useParams<{ id: string }>();
    const { courses } = useAllCoursesAllCategories();
    const course = courses?.find((c: CourseInfoDto) => c.courseId === id);
    const { courseLessons } = useCourseLessons({ courseId: id as string });

    // လက်ရှိ ရွေးချယ်ထားသော lesson
    const [activeLesson, setActiveLesson] = useState<LessonDto | null>(null);

    // Lesson list ရောက်လာလျှင် ပထမဆုံး lesson ကို default အဖြစ် select လုပ်မည်
    useEffect(() => {
        if (courseLessons && courseLessons.length > 0 && !activeLesson) {
            setActiveLesson(courseLessons[0]);
        }
    }, [courseLessons, activeLesson]);

    // OneDrive share link ကို embed URL ဖြစ်အောင် ပြောင်းလဲပေးသည့် function
    const formatOneDriveEmbedUrl = (url: string): string => {
        if (!url) return "";

        // 1drv.ms link များအတွက် embed query parameter ထည့်သွင်းခြင်း
        if (url.includes("1drv.ms") || url.includes("onedrive.live.com")) {
            const separator = url.includes("?") ? "&" : "?";
            // embed parameter မပါသေးပါက ထည့်ပေးမည်
            if (!url.includes("embed=")) {
                return `${url}${separator}embed=1`;
            }
        }
        return url;
    };

    return (
        <div className="container-fluid py-4 px-lg-5">
            {/* Course Title Header */}
            <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold mb-1">{course?.title || "Course Lessons"}</h2>
                <div className="d-flex align-items-center gap-2 mt-2">
                    {course?.categoryName && (
                        <span className="badge bg-primary text-uppercase">
              {course.categoryName}
            </span>
                    )}
                    {course?.teacherName && (
                        <span className="text-muted small">
              Instructor: <strong className="text-dark">{course.teacherName}</strong>
            </span>
                    )}
                </div>
            </div>

            <div className="row g-4">
                {/* Left Side: Embedded Video Player & Details */}
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                        {/* Video Player Container */}
                        <div className="ratio ratio-16x9 bg-black">
                            {activeLesson?.lessonVideoUrl ? (
                                <iframe
                                    key={activeLesson.lessonVideoUrl} // URL ပြောင်းတိုင်း player အသစ် reload ဖြစ်ရန်
                                    src={formatOneDriveEmbedUrl(activeLesson.lessonVideoUrl)}
                                    title={activeLesson.lessonName}
                                    className="w-100 h-100 border-0"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="d-flex justify-content-center align-items-center text-white h-100">
                                    <span className="text-secondary">No video selected</span>
                                </div>
                            )}
                        </div>

                        {/* Active Lesson Info */}
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-2">
                                {activeLesson?.lessonName || "Select a lesson to begin"}
                            </h4>
                            <p className="text-muted mb-0">
                                {activeLesson?.lessonDescription || "No description provided for this lesson."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Lesson Playlist Sidebar */}
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Course Content</h5>
                            <span className="badge bg-secondary-subtle text-secondary rounded-pill">
                {courseLessons?.length || 0} Lessons
              </span>
                        </div>

                        <div
                            className="list-group list-group-flush overflow-y-auto"
                            style={{ maxHeight: "580px" }}
                        >
                            {courseLessons && courseLessons.length > 0 ? (
                                courseLessons.map((lesson: LessonDto, index: number) => {
                                    const isSelected = activeLesson?.lessonVideoUrl === lesson.lessonVideoUrl;

                                    return (
                                        <button
                                            type="button"
                                            key={lesson.lessonVideoUrl || index}
                                            onClick={() => setActiveLesson(lesson)}
                                            className={`list-group-item list-group-item-action p-3 text-start border-bottom d-flex align-items-center justify-content-between ${
                                                isSelected ? "active text-white" : ""
                                            }`}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                        <span
                            className={`badge rounded-circle p-2 ${
                                isSelected ? "bg-white text-primary" : "bg-light text-dark"
                            }`}
                            style={{ width: "30px", height: "30px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        >
                          {index + 1}
                        </span>
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">{lesson.lessonName}</h6>
                                                </div>
                                            </div>

                                            <span className="small ms-2">
                        {isSelected ? "▶ Playing" : "▶"}
                      </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-4 text-center text-muted">
                                    No lessons found for this course.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}