import type {CourseInfoDto} from "../../course/dto/CourseInfoDto.ts";
import {useEffect, useState} from "react";
import {StudentApiService} from "../api/StudentApiService.ts";

export default function useEnrolledCourses() {
    const [courses, setCourses] = useState<CourseInfoDto[]>([]);
    useEffect(() => {
        const fetchAllEntrolledCourses = async ()=>{
            try{
                const courses =
                    await StudentApiService.getEnrolledCourses();
                setCourses(courses);
            }catch (e){
                console.error(e);
            }

        }
        fetchAllEntrolledCourses();
    }, []);
    return (
        {
            courses
        }
    );
}
