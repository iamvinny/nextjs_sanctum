import GuestLayout from "@/layouts/GuestLayout";
import LoginForm from "./_components/LoginForm";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {

    return (
        <GuestLayout>
            <LoginForm />
        </GuestLayout>
    );
}
