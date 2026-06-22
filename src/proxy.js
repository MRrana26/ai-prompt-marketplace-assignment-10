import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth';


export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/payment',
    '/dashboard/admin/:path*',
    '/dashboard/user/:path*',
    '/dashboard/creator/:path*',
  ],
};