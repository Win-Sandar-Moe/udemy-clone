import type {LoginRequest} from "../dto/LoginRequest.ts";
import type {AuthResponse} from "../dto/AuthResponse.ts";
import axiosClient from "./axiosClient.ts";
import type {RegisterDto} from "../dto/RegisterDto.ts";
export const loginApiCall =
    async (loginRequest:LoginRequest):Promise<AuthResponse> =>{
    const response =
        await axiosClient.post<AuthResponse>("/api/auth/login",loginRequest);
    if(response.status !== 200) {
        throw new Error("Failed to login");
    }
    return response.data;
}
export const registerApiCall = async(registerDto:RegisterDto):Promise<Object>=>{
    const response = await axiosClient.post(`/api/auth/register`,registerDto);
    return response.data;
}