import Link from "next/link";
import {getServerSession} from "next-auth";
import Image from "next/image";
import coffee from '@/public/images/coffee.jpg';
import {Metadata} from "next";
import dynamic from "next/dynamic"
import AddToCart from "@/app/components/AddToCart";
import {authOptions} from "@/app/api/auth/authOptions";
const HeavyComponent = dynamic(
    () => import('./components/HeavyComponent'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    }
); // lazy load component

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <h1>Hello {session && <span>{session.user!.name}</span>}</h1>

            <AddToCart />

            <div className="relative h-screen">
                <Image src="https://bit.ly/react-cover" alt="Coffee" fill className="object-cover"
                       sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw" quality={100} priority/>
            </div>
        </main>
    )
}

// dynamic metadata overriding for a single page
export async function generateMetadata(): Promise<Metadata> {
    // const product = await fetch('');

    return {
        title: 'product.title',
        description: 'product.description'
    }
}