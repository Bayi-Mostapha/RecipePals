import NavBar from "@/components/user/navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <NavBar />
            <main className="p-5 mt-5">
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;