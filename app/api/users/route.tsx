import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/users/schema";
import prisma from "@/prisma/client";

// GET
// to prevent caching add request even if not used
export async function GET(request: NextRequest) {
    // fetch users from a db
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

// POST
export async function POST(request: NextRequest) {
    const body = await request.json();
    // validate
    // if invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    // else create new user and add to the db if it's not there
    const user = await prisma.user.findUnique({
        where: {email: body.email}
    })

    if (user)
        return NextResponse.json({error: 'User already exists'}, {status: 400})

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(newUser, {status: 201});
}
