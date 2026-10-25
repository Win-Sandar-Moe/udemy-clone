export const UserType = {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER",
    ADMIN: "ADMIN",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export const StudentEducation = {
    HIGH_SCHOOL: "HIGH_SCHOOL",
    UNDERGRADUATE: "UNDERGRADUATE",
    GRADUATE: "GRADUATE",
    DOCTORATE: "DOCTORATE",
} as const;
export type StudentEducation = (typeof StudentEducation)[keyof typeof StudentEducation];

export interface RegisterDto {
    username: string;
    password: string;
    email: string;
    address?: string;
    studentEducation?: StudentEducation;
    teacherEducation?: string;
    skills?: string[];
    userType: UserType;
}