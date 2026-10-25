import type {CourseInfoDto} from "../../course/dto/CourseInfoDto.ts";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";


interface CourseCartState{
    cart:CourseInfoDto[],
    addToCart: (course:CourseInfoDto) => boolean,
    removeFromCart:(courseId:string) => void,
    clearCart:() => void,
    isInCart: (courseId:string) => boolean,
    getTotalPrice:() => number;
    getTotalCount:() => number;
}

export const useCourseCartStore =
    create<CourseCartState>()(
        persist(
            (set,get)=>({
                cart:[],
                addToCart:(course:CourseInfoDto) =>{
                    const exists = get().cart.some((item) => item.courseId === course.courseId);
                    if(exists){
                        return false;
                    }
                    set({cart:[...get().cart,course]})
                    return true;
                },
                removeFromCart:(courseId:string) =>{
                    set({cart:get().cart.filter((item) => item.courseId !== courseId)});
                },
                clearCart:() => set({cart:[]})
                ,
                isInCart: (courseId:string) => get().cart.some((item) => item.courseId === courseId),
                getTotalPrice:() => get().cart.reduce((total, item) => total + item.fees, 0),
                getTotalCount:() => get().cart.length
            })
                ,{
                name:"udemy-course-cart",
                storage: createJSONStorage(() => localStorage)
        })

    )