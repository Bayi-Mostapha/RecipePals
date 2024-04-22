import { Button } from "@/components/ui/button";
import { LOGIN, SIGNUP } from "@/router/urls";
import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function NavBar() {
    const user = null
    return (
        <nav>
            <h1>Recipes</h1>
            {user ? (
                <div>
                    {/* <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                    <Button variant="outline">Log Out</Button>
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