'use client';
import React from 'react'
import z from 'zod';
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn, useSession} from "next-auth/react";
import {User} from "next-auth";

const schema = z.object({
    userPassword: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

const ChangePasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const {status, data: session} = useSession();
    if (session?.user) {
        const changePasswordSubmit = async (data: FieldValues) => {
            const userId = session.user.id;
            const userEmail = session.user.email;
            const newUserPassword = {
                password: data.userPassword,
            }
            const response = await fetch(`/api/register/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserPassword),
            });
            if (response.ok) {
                reset();
                await signIn("credentials", {
                    email: userEmail,
                    password: newUserPassword.password,
                    redirect: true,
                    callbackUrl: "/",
                })
            }
        };

        return (
            <div>
                <h1 className="mb-3">Change password</h1>
                <form onSubmit={handleSubmit(changePasswordSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">Password</label>
                        <input {...register('userPassword')}
                               type="password"
                               id="userPassword"
                               className="form-control"/>
                        {errors.userPassword && (<p className="text-danger">{errors.userPassword.message}</p>)}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={!isValid}>Change password</button>
                </form>
            </div>
        )
    } else
        return null;
}
export default ChangePasswordPage;
