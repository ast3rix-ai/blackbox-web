import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Check if we've already set the geo cookie
    const geoCountry = request.cookies.get('geo-country');

    if (!geoCountry) {
        // Get country from Vercel's geolocation header
        // This header is automatically provided by Vercel Edge Network
        const country = request.headers.get('x-vercel-ip-country') || 'US';

        // Set a cookie with the detected country (expires in 1 year)
        response.cookies.set('geo-country', country, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            sameSite: 'lax',
        });
    }

    return response;
}

// Run middleware on all pages
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
