import NavBar from "@/components/user/navbar";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <>
            <main className="min-h-screen flex justify-center items-center">
                <Outlet />
            </main>
        </>
    );
}

export default AuthLayout;