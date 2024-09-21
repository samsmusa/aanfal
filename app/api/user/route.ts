import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {formSchema} from "@/app/signup/interface";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";


export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json();

        const validationResult = formSchema.safeParse(body);

        if (!validationResult.success) {

            return NextResponse.json(
                {
                    message: "Invalid form data",
                    errors: validationResult.error.errors,
                },
                {status: 400}
            );
        }

        const {email, password} = validationResult.data;
        console.log(email, password);
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: {
                email,
                accounts: {
                    create: {
                        type: "credentials",
                        provider: "local",
                        providerAccountId: email,
                        access_token: hashedPassword,
                    },
                },
            },
        });


        return NextResponse.json({
            message: "User created successfully!",
            user,
        });
    } catch (error) {
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {

                return NextResponse.json(
                    {message: "Email already exists. Please use a different email."},
                    {status: 409}
                );
            }
        }


        return NextResponse.json(
            {message: "An unexpected error occurred."},
            {status: 500}
        );
    }
};
