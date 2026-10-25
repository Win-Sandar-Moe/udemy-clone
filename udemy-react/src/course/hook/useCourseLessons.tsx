import type {LessonDto} from "../dto/LessonDto.ts";
import {useEffect, useState} from "react";
import {courseApiService} from "../courseApiService.ts";

export default function
    useCourseLessons({courseId}: {courseId: string}) {
    const [courseLessons,setCourseLessons]=useState<LessonDto[]>([]);
    useEffect(() => {
        const fetchAllCourseLessons = async() =>{
            try{
                const courseLessons =
                    await courseApiService.getCourseLessonsByCourseId(courseId);
                setCourseLessons(courseLessons);
            }catch (e){
                console.error(e);
            }
        }
        fetchAllCourseLessons();
    }, []);
    return (
        {
            courseLessons
        }
    );
}
