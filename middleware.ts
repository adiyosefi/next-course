// protect routes - if route in config file - redirect user to login
export { default } from "next-auth/middleware"; // export middleware from next auth

export const config = {
    // *: zero or more params
    // +: one or more
    // ?: zero or one
    matcher: ['/dashboard/:path*', '/changePassword']
}