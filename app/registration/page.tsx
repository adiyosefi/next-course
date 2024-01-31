'use client';
import React from 'react'
import z from 'zod';
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";

interface User {
    name: string;
    email: string;
    password: string;
}

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    userPassword: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const signInSubmit = async (data: FieldValues) => {
        const newUser: User = {
            name: data.name,
            email: data.email,
            password: data.userPassword,
        }
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        if (response.ok) {
            reset();
            await signIn("credentials", {
                email: newUser.email,
                password: newUser.password,
                redirect: true,
                callbackUrl: "/",
            })
        }
    };

    return (
        <div>
            <h1 className="mb-3">Register</h1>
            <form onSubmit={handleSubmit(signInSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input {...register('name')}
                           type="text"
                           id="name"
                           className="form-control"/>
                    {errors.name && (<p className="text-danger">{errors.name.message}</p>)}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input {...register('email')}
                           type="text"
                           id="email"
                           className="form-control"/>
                    {errors.email && (<p className="text-danger">{errors.email.message}</p>)}
                </div>

                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input {...register('userPassword')}
                           type="password"
                           id="userPassword"
                           className="form-control"/>
                    {errors.userPassword && (<p className="text-danger">{errors.userPassword.message}</p>)}
                </div>

                <button type="submit" className="btn btn-primary" disabled={!isValid}>Sign up</button>
            </form>
        </div>
    )
}
export default RegistrationPage;
