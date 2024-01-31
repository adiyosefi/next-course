import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/users/schema";
import prisma from "@/prisma/client";

// GET a single user
export async function GET(request: NextRequest,
                          {params}: { params: { id: string } }) {
    // Fetch from db, if not found return 404
    const user = await prisma.user.findUnique({
        where: {id: params.id}
    })
    if (!user)
        return NextResponse.json({error: 'User not found'}, {status: 404})
    return NextResponse.json(user);
}

// PUT - replace object
export async function PUT(request: NextRequest,
                          {params}: { params: { id: string } }) {
    const body = await request.json();
    // validate
    // if invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    // get user by id
    const user = await prisma.user.findUnique({
        where: {id: params.id}
    })
    // if doesn't exists return 404
    if (!user)
        return NextResponse.json({error: 'user not found'}, {status: 404})
    // else fetch user with given id return updated user
    const updatedUser = await prisma.user.update({
        where: {id: user.id},
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(updatedUser);
}

// DELETE
export async function DELETE(request: NextRequest,
                             {params}: { params: { id: string } }) {
    // fetch user from db
    const user = await prisma.user.findUnique({
        where: {id: params.id}
    })
    // if not found return 404
    if (!user)
        return NextResponse.json({error: 'user not found'}, {status: 404})
    // delete user, return 200
    await prisma.user.delete({
        where: {id: user.id}
    })
    return NextResponse.json({});
}
