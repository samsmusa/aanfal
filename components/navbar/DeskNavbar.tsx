"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/ui/icons";
import {siteConfig} from "@/config/site";
import {useSession} from "next-auth/react";
import React from "react";
import {Button} from "@/components/ui/button";
import {UserDropDownMenu} from "@/components/navbar/UserDropDownMenu";

export function DeskNavbar() {
    const pathname = usePathname();
    const router = useRouter()

    const {data: session, update} = useSession()

    const getLinkClassName = (href: string, exact = false) => {
        const isActive = exact ? pathname === href : pathname?.startsWith(href);
        return cn(
            "hover:text-foreground/80 transition-colors", // Make hover and transition consistent
            isActive ? "text-foreground" : "text-foreground/60"
        );
    };
    React.useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <div className="bg-white">
            <div className="container mx-auto hidden md:flex justify-evenly items-center py-4 px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-2 lg:space-x-3">
                    <Icons.logo className="h-6 w-6"/>
                    <span className="hidden lg:inline-block font-bold">
            {siteConfig.name}
          </span>
                </Link>
                <nav className="flex items-center gap-4 lg:gap-6 text-sm">
                    <Link href="/docs" className={getLinkClassName("/docs", true)}>
                        Docs
                    </Link>
                    <Link href="/docs/components" className={getLinkClassName("/docs/components")}>
                        Components
                    </Link>
                    <Link href="/blocks" className={getLinkClassName("/blocks")}>
                        Blocks
                    </Link>
                    <Link href="/charts" className={getLinkClassName("/docs/components/chart")}>
                        Charts
                    </Link>
                    <Link href="/themes" className={getLinkClassName("/themes")}>
                        Themes
                    </Link>
                    <Link href="/examples" className={getLinkClassName("/examples")}>
                        Examples
                    </Link>
                    <Link href="/colors" className={getLinkClassName("/colors")}>
                        Colors
                    </Link>
                </nav>
                {session ? <UserDropDownMenu/> : <Button onClick={()=> router.push('/signin')} variant="secondary">Sign In</Button>}

            </div>
        </div>
    );
}
