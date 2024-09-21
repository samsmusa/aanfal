"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import LoaderWithText from "@/components/utils/LoaderWithText";
import {toast} from "sonner";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {signInFormSchema} from "@/app/signup/interface";
import Link from "next/link";
import {Url} from "@/lib/utils";

export default function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const nextUrl = searchParams.get("next");
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
        setLoading(true);
        const {email, password} = data;
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            console.log(result)
            if (!result?.error) {
                toast("Login successful", {
                    description: "Welcome back!",
                });

                router.push(nextUrl || "/");
                router.refresh();
            } else {
                form.setError("email", {
                    type: "manual",
                    message: "Username is incorrect.",
                });
                form.setError("password", {
                    type: "manual",
                    message: "password is incorrect.",
                });
                toast("Login Failed", {
                    description: "Username or password is incorrect!",
                });
                toast("Login Failed", {
                    description: "username or password is not correct!",
                });
            }
        } catch (error) {
            toast("Login failed", {
                description: "something went wrong",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your password must be at least 8 characters long.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full relative bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            <LoaderWithText loading={loading} text={"Sign In"}/>
                        </Button>
                        <div className="text-sm">
                            Create New account? <Link className="text-indigo-400" href={Url('/signup')}>Sign Up</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
