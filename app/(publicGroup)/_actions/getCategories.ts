"use server"

import { categoryType } from "../_components/CategoryCard";

export const getCategories = async () => {
    let categories: categoryType[] = [];

    try {

        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (res.ok) {
            const result = await res.json();
            categories = result?.data || [];
            return categories;
        }

    } catch (error: any) {
        console.error("Error fetching categories:", error);
    }
}