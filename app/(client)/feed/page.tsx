import Link from "next/link";
import ClientLayout from "@/layouts/ClientLayout";

export default function DashboardPage() {

    return (
        <ClientLayout>
            <h1>Dashboard, this page is protected.</h1>

            <div className="flex justify-center items-left mb-2 gap-2">
                <Link href="/settings" className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Settings
                </Link>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md">Logout</button>
            </div>
        </ClientLayout>
    );

}