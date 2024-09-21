import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";


// Action to read
export const GET = async (req: NextRequest) => {
    const posts = await prisma.post.findMany({});

    return NextResponse.json({
        posts,
    });
};

// Action to create
export const POST = async (req: NextRequest) => {
    const {title, content} = await req.json();

    const post = await prisma.post.create({
        data: {
            title,
            content,
        },
    });

    return NextResponse.json({
        post,
    });
};

// Action to delete
export const DELETE = async (req: NextRequest) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get("id")) || 0;

    const post = await prisma.post.delete({
        where: {
            id: String(id),
        },
    });

    if (!post) {
        return NextResponse.json(
            {
                message: "Error",
            },
            {
                status: 500,
            }
        );
    }

    return NextResponse.json({});
};

// Action to update or edit
export const PUT = async (req: NextRequest) => {
    const {title, content, id} = await req.json();

    const post = await prisma.post.update({
        where: {
            id: String(id),
        },

        data: {
            title,
            content,
        },
    });

    return NextResponse.json({
        post,
    });
};