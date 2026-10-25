import type {CategoryDto} from "./dto/CategoryDto.ts";
import axiosClient from "../auth/api/axiosClient.ts";
import type {CourseInfoDto} from "./dto/CourseInfoDto.ts";
import type {LessonDto} from "./dto/LessonDto.ts";


export const courseApiService ={
    getAllCategories : async ():Promise<CategoryDto[]> =>{
        const response =
            await axiosClient.get<CategoryDto[]>(`/api/courses/categories`);
        if(response.status !== 200){
            throw new Error("Failed to fetch categories");
        }
        return response.data;
    },
    getAllCourses: async ():Promise<CourseInfoDto[]> => {
        const response =
            await axiosClient.get<CourseInfoDto[]>(`/api/courses`);
        if(response.status !== 200){
            throw new Error("Failed to fetch categories");
        }
        return response.data;
    },
    createCourseLessons: async(courseLesson:LessonDto):Promise<string> =>{
        const response =
            await axiosClient.post(`/api/courses/lessons`,courseLesson);
        return response.data;
    },
    getAllCoursesAllCategories: async () :Promise<CourseInfoDto[]> =>{
        const response =
            await axiosClient.get<CourseInfoDto[]>(`/api/courses/all`);
        if(response.status !== 200){
            throw new Error("Failed to fetch categories");
        }
        return response.data;
    },
    getCourseLessonsByCourseId: async(courseId:string):Promise<LessonDto[]> =>{
        const response =
            await axiosClient.get<LessonDto[]>(`/api/courses/lessons/${courseId}`);
        if(response.status !== 200){
            throw new Error("Failed to fetch categories");
        }
        return response.data;
    }
}