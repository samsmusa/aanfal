import prisma from '@/lib/prisma'
import {MainCarousel} from "@/components/carousel/MainCarousel";

export default async function Page() {
    let allPosts = await prisma.post.findMany({})
    console.log(allPosts)
    return (
        <div className="container mx-auto">
            <MainCarousel/>
        </div>
    )
}