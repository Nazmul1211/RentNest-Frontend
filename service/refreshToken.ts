"user server"


import { cookies } from "next/headers";

const getNewAccessToken = async () => {

    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    console.log(refreshToken, "refreshToken from getme.ts file");

    if(!refreshToken){
        // throw new Error ("User not logged In!");
        return {
            success: false,
            errorMessage: "Refresh Token not found!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie : `refreshToken=${refreshToken}`
        },

        cache: "no-cache",
    })

    const result = await res.json();

    console.log(result, "result from getme.ts");

    return result;
}

export default getNewAccessToken