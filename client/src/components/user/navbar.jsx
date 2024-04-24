import { useContext, useState } from "react";
import { authContext } from "@/contexts/auth-wrapper";
import { Link } from "react-router-dom";
import { LOGIN, SIGNUP } from "@/router/urls";
// shadcn 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut } from "lucide-react";

function NavBar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(authContext)
    return (
        <nav className="p-3 flex justify-between shadow-sm">
            <h1 className="text-primary font-bold text-xl">RecipePals</h1>
            {user ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <h2 className="text-sm font-semibold">{user.fullname}</h2>
                            <p className="text-xs">{user.email}</p>
                        </div>
                        <ChevronDown className={`transition-all ${open && 'rotate-180'}`} size={16} strokeWidth={1.25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center gap-3">
                    <Link className="block px-3 py-1 border bg-primary-foreground rounded hover:opacity-90 active:opacity-80" to={SIGNUP}>Sign Up</Link>
                    <Link className="block px-3 py-1 font-medium border bg-primary text-white rounded hover:opacity-90 active:opacity-80" to={LOGIN}>Login</Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;