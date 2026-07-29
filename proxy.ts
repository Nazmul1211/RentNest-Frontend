import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";
import getNewAccessToken from "./service/refreshToken";



const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/categories"];

export default async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  let cookieStore = await cookies();


  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;


  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
    : null;

  if(!decodedAccessToken?.success && decodedRefreshToken?.success){
    // If access token has expired but refresh token is valid then get new access token from the backend and set it in the cookies

    cookieStore.delete("accessToken");
    const result = await getNewAccessToken();

    if(result.success){
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 // 1 Day
      });

      accessToken = newAccessToken;

      // Update the decodedAccessToken with the new access token
      const updatedDecodedAccessToken = jwtUtils.verifyToken(newAccessToken, process.env.JWT_SECRET as string);

      if(!updatedDecodedAccessToken?.success){
        // If the new access token is invalid, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }

    } else {
      // If refresh token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }


  let userRole = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role; 
  }

  //If User is logged in and trying to access register and login page again by url then redirect them to the user role specific dashboards

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/author/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }


  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authorization: Role Based Access Control
  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }


  // return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
