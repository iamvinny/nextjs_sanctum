import Link from "next/link";
import ClientLayout from "@/layouts/ClientLayout";

export default function DashboardPage() {

    return (
        <ClientLayout>
            <h1 className="text-2xl font-bold text-center my-6">Dashboard</h1>

            <div className="flex justify-center items-left my-6 gap-2">
                <Link href="/settings" className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Settings
                </Link>
            </div>
        </ClientLayout>
    );

}