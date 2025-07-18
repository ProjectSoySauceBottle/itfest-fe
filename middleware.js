// import { getCookie } from "cookies-next";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const { pathname, searchParams } = request.nextUrl;
//   const token = cookies().get("token")?.value;

//   if (!token && !["/login", "/register"].includes(pathname)) {
//     const returnUrl = encodeURIComponent(`${pathname}${searchParams}`);
//     return NextResponse.redirect(
//       new URL(`/login?returnUrl=${returnUrl}`, request.url)
//     );
//   }

//   if (token && ["/login", "/register"].includes(pathname)) {
//     const returnUrl = searchParams.get("returnUrl");
//     return NextResponse.redirect(
//       new URL(returnUrl || "/dashboard", request.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/register", "/dashboard/:path*", "/profile"],
// };
