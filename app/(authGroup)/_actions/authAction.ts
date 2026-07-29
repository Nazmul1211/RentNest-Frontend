"use server"

import { cookies } from "next/headers"


type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string,
        user: {
            id: string,
            name: string,
            email: string,
            phone: string,
            profilePhoto: string | null,
            role: string,
            status: string,
            stripeCustomerId: string | null,
            hasCompletedPayment: boolean,
            createdAt: string,
            updatedAt: string
        }
    }
}


const LoginAction = async (previousState: LoginState, formData: FormData) => {
    // console.log(formData, "Form Data");


    console.log(previousState, "Previous State");

    const email = formData.get("email");
    const password = formData.get("password");


    const payload = {
        email,
        password
    }


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    console.log(result, "Response Data");

    if(result.success) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken ,{
            httpOnly: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 // 1 Day
        })

        cookieStore.set("refreshToken", result.data.refreshToken ,{
            httpOnly: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7 // 7 Day
        })

        
    }

    return result;

}


export default LoginAction;