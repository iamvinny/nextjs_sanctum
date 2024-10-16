import { useAuth } from "@/context/AuthContext";

export default function Navbar({ user }: { user: any }) {
    const { logout } = useAuth();
    
    return (
        <div className="flex justify-between items-center p-4 bg-red-600">
            <div>
                <img src="https://cdn1.iconfinder.com/data/icons/cartoon-snack/128/pizza-512.png" className="w-10 h-10" alt="logo" />
                <p>{user.first_name} {user.last_name}</p>
            </div>
            <div>
                <input type="text" placeholder="Search" />
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );

}