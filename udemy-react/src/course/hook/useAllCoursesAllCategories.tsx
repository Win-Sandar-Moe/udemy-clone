import type {CourseInfoDto} from "../dto/CourseInfoDto.ts";
import {useEffect, useState} from "react";
import {courseApiService} from "../courseApiService.ts";

export default function useAllCoursesAllCategories() {
    const [courses, setCourses] = useState<CourseInfoDto[]>([]);
    useEffect(() => {
        const fetchAllCourses = async () =>{
            try{
                const courses=
                    await courseApiService.getAllCoursesAllCategories();
                setCourses(courses);
            }catch (e){
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
