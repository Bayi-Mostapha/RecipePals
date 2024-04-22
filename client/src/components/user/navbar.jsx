import { Button } from "@/components/ui/button";
import { authContext } from "@/contexts/auth-wrapper";
import { LOGIN, SIGNUP } from "@/router/urls";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function NavBar() {
    const { user, logout } = useContext(authContext)
    return (
        <nav>
            <h1>Recipes</h1>
            {user ? (
                <div>
                    {/* <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    {user.fullname}
                    <Button variant="outline" onClick={logout}>Log Out</Button>
                </div>
            ) : (
                <div>
                    <Link to={SIGNUP}>Sign Up</Link>
                    <Link to={LOGIN}>Login</Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;