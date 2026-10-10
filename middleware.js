import{NextResponse}from"next/server";import{getSessionCookie}from"better-auth/cookies";
export function middleware(r){if(!getSessionCookie(r)){const u=new URL("/signin",r.url);u.searchParams.set("redirected","1");return NextResponse.redirect(u)}return NextResponse.next()}
export const config={matcher:["/product/:path*","/profile/:path*"]};
