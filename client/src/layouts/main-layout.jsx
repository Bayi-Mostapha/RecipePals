import NavBar from "@/components/user/navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;