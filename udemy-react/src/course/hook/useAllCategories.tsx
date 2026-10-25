import {useEffect, useState} from "react";
import type {CategoryDto} from "../dto/CategoryDto.ts";
import {courseApiService} from "../courseApiService.ts";

export default function useAllCategories() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    useEffect(() => {
        const fetchAllCategories = async () =>{
            const categories =
                await courseApiService.getAllCategories();
            setCategories(categories);
        }
        fetchAllCategories();
    }, []);
    return (
        {categories}
    );
}
