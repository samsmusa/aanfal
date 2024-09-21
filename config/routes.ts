export const ROUTE = {
    PUBLIC_ROUTE: {
        HOME: '/'
    },
    PRIVATE_ROUTE: {
        DASHBOARD: '/dashboard',
        DASHBOARD_APPLICATION: '/dashboard/application',
        DASHBOARD_SERVICES: '/dashboard/services',
    },
    AUTH_ROUTE: {
        SIGN_IN: "/signin",
        SIGN_UP: "/signup",
    }
}

export const PUBLIC_ROUTE = Object.values(ROUTE.PUBLIC_ROUTE)
export const AUTH_ROUTE = Object.values(ROUTE.AUTH_ROUTE)
export const PRIVATE_ROUTE = Object.values(ROUTE.PRIVATE_ROUTE)