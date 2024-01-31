'use client';
import React from 'react'
import Link from "next/link";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const {status, data: session} = useSession();

    return (
        <div className="flex bg-slate-200 p-5 space-x-3">
            <Link href='/' className="mr-5">Next.js</Link>
            <Link href='/users'>Users</Link>
            {status === 'authenticated' &&
                <>
                    <div>{session.user!.name}</div>
                    <Link href="/api/auth/signout" className='ml-3'>Sign out</Link>
                    <Link href="/changePassword" className='ml-3'>Change password</Link>
                </>
            }
            {status === 'unauthenticated' &&
                <>
                    <Link href='/api/auth/signin'>Login</Link>
                    <Link href='/registration'>Sign up</Link>
                </>}
        </div>
    )
}
export default NavBar
