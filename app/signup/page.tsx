"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import React, {useState} from "react";
import LoaderWithText from "@/components/utils/LoaderWithText";
import {formSchema} from "@/app/signup/interface";
import {toast} from "sonner";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {Url} from "@/lib/utils";


export default function Page() {
    const [loading, setLoading] = useState<boolean>(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter();
    const nextUrl = searchParams.get("next");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true)
        setServerError(null)

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }
            setSuccess(true)
            await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            toast('Account create successfully', {
                description: "Wellcome",
            })
            router.push(nextUrl || "/profile");
            router.refresh();
        } catch (error) {
            setServerError("Failed to create account. Try again.")
        } finally {
            setLoading(false)

        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormDescription>This will be your public display name.</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                                    <FormDescription>Your password must be at least 8 characters long.</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit"
                                className="w-full relative bg-indigo-600 hover:bg-indigo-700 text-white">
                            <LoaderWithText loading={loading} text={"Sign Up"}/>
                        </Button>
                        <div>
                            Already have an account? <Link href={Url('/signin')}>Sign In</Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
