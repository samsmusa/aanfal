import {DeskNavbar} from "@/components/navbar/DeskNavbar";
import {MobileNav} from "@/components/navbar/MobileNav";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";

export default async function Navbar() {
    const session = await auth()
    return (
        <div>
            <SessionProvider session={session}>
                <DeskNavbar/>
                <MobileNav/>
            </SessionProvider>
        </div>
    )
}