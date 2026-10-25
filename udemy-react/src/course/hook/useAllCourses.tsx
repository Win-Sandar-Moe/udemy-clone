import {useEffect, useState} from "react";
import type {CourseInfoDto} from "../dto/CourseInfoDto.ts";
import {courseApiService} from "../courseApiService.ts";

export default function useAllCourses() {
    const [courses,setCourses] = useState<CourseInfoDto[]>();
    useEffect(() => {
        const fetchAllCourses = async () =>{
            try{
                const courses =
                    await courseApiService.getAllCourses();
                setCourses(courses);
            }catch (e) {
                console.log(e);
            }
        }
        fetchAllCourses();
    }, []);
    return (
        {
            courses
        }
    );
}
