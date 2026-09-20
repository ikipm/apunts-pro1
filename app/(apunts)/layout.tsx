import Link from "next/link";
import MoveLeft from "@/components/move-left";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col mt-4">
            <Link href="/" className="flex flex-row items-center gap-2">
                <MoveLeft /> Inici
            </Link>
            {children}
        </main>
    );
}
