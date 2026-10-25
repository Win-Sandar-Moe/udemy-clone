import axiosClient from "../../auth/api/axiosClient.ts";
import type {CourseInfoDto} from "../../course/dto/CourseInfoDto.ts";


export const StudentApiService = {
    enrollCourse: async(courseIds:string[]):Promise<string> =>{
        const response=
            await axiosClient.post(`/api/students/enroll`,courseIds);
        return response.data;
    },
    getEnrolledCourses: async() :Promise<CourseInfoDto[]> =>{
        const response=
            await axiosClient.get(`/api/students/enrolled-courses`);
        if(response.status !== 200){
            throw new Error(`Failed to fetch enrolled courses. Status: 
            ${response.status}`);
        }
        return response.data;
    }
}