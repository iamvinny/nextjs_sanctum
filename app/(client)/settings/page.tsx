import ClientLayout from "@/layouts/ClientLayout";
import Form from "./_components/Form";
import Link from "next/link";

export default function SettingsPage() {

    return (
        <ClientLayout>
            <h1 className="text-2xl font-bold text-center my-12">Settings</h1>

            <Form />

            {/* back button */}
            <div className="flex justify-center items-center my-12">
                <Link href="/feed" className="bg-red-600 text-white px-4 py-2 rounded-md">Back</Link>
            </div>
        </ClientLayout>
    )

}