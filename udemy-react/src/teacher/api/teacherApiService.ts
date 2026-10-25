

//const COURSE_API_URL = "http://localhost:8080/api/courses";

import axiosClient from "../../auth/api/axiosClient.ts";

export const teacherApiService ={
    createCourse: async (formdata:FormData):Promise<string> =>{
        const response = await axiosClient
            .post<string>(`/api/courses`,formdata,{
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });

        return response.data;
    },

}