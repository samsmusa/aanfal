"use client"

import Link from "next/link";
import {Badge, Bell, Home, LineChart, Package, Package2, ShoppingCart, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {ROUTE} from "@/config/routes";
import {cn} from "@/lib/utils";

export function Sidebar() {
    const path = usePathname()
    console.log(path.toString())
    return (
        <>
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-6 w-6"/>
                    <span className="">Aanfal</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4"/>
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href={ROUTE.PRIVATE_ROUTE.DASHBOARD}
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            path.toString() === ROUTE.PRIVATE_ROUTE.DASHBOARD ? "bg-muted text-primary" : "text-muted-foreground")}
                    >
                        <Home className="h-4 w-4"/>
                        Dashboard
                    </Link>
                    <Link
                        href={ROUTE.PRIVATE_ROUTE.DASHBOARD_SERVICES}
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            path.toString() === ROUTE.PRIVATE_ROUTE.DASHBOARD_SERVICES ? "bg-muted text-primary" : "text-muted-foreground")}
                    >
                        <Home className="h-4 w-4"/>
                        Services
                    </Link>
                    <Link
                        href={ROUTE.PRIVATE_ROUTE.DASHBOARD_APPLICATION}
                        className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                            path.toString() === ROUTE.PRIVATE_ROUTE.DASHBOARD_APPLICATION ? "bg-muted text-primary" : "text-muted-foreground")}
                    >
                        <ShoppingCart className="h-4 w-4"/>
                        Applications
                        <Badge
                            className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            6
                        </Badge>
                    </Link>
                </nav>
            </div>
        </>
    )
}