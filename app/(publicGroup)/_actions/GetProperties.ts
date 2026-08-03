"use server";

export const GetProperties = async () => {

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) return [];

        const data = await res.json();
        return data?.data;

    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};



export const GetSingleProperty = async (id: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/properties/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data?.data;

    } catch (error) {
        console.error(`Error fetching single property detail (${id}):`, error);
        return null;
    }
};
