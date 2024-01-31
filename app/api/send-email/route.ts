import {Resend} from "resend";
import {NextResponse} from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
    await resend.emails.send({
        from: '...', // domain we own. need to add to resend domain
        to: 'adi.yosefi95@gmail.com',
        subject: '...',
        react: '<WelcomeTemplate name="Adi" />'
    });

    return NextResponse.json({});
}

