import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import {z} from "zod";

const schema = z.object({
    password: z.string().min(5),
})

// PATCH - update object password
export async function PATCH(request: NextRequest,
                            {params}: { params: { id: string } }) {
    const body = await request.json();
    // validate
    // if invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})
    // get user by email
    const user = await prisma.user.findUnique({
        where: {id: params.id}
    })
    // if doesn't exists return 404
    if (!user)
        return NextResponse.json({error: 'user not found'}, {status: 404})
    // else fetch user with given id return updated user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const updatedUser = await prisma.user.update({
        where: {id: user.id},
        data: {
            hashedPassword: hashedPassword
        }
    })
    return NextResponse.json(updatedUser);
}
