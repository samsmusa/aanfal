import {auth} from "@/auth";
import {AUTH_ROUTE, PUBLIC_ROUTE} from "@/config/routes";
import {NextRequest, NextResponse} from "next/server";

export default auth((req: NextRequest) => {
    const nextUrl = req.nextUrl;
    const isAuthenticated = !!req.auth;
    const nextQueryParam = nextUrl.searchParams.get('next');

    console.log(nextUrl);

    const isPublicRoute = PUBLIC_ROUTE.includes(nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTE.includes(nextUrl.pathname);

    if (isAuthenticated && isAuthRoute) {

        return NextResponse.redirect(new URL('/', nextUrl));
    }

    if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {

        const redirectUrl = new URL('/signin', req.url);
        redirectUrl.searchParams.set('next', nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }
    if (isAuthenticated && isAuthRoute) {

        return NextResponse.redirect(new URL(nextQueryParam || '/', nextUrl));
    }


    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
