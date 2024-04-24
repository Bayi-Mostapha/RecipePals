import RotatingImages from '@/components/home/rotating-images';
import { authContext } from '@/contexts/auth-wrapper';
import { LOGIN, RECIPES, SIGNUP } from '@/router/urls';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

function Home() {
    const { user } = useContext(authContext);

    if (user) {
        return <Navigate to={RECIPES} />
    }

    return (
        <>
            <div className='mt-5 flex flex-col-reverse lg:flex-row lg:justify-around items-center gap-5 lg:gap-0'>
                <div className="p-5 lg:p-0 w-[90%] lg:w-[30%] text-center lg:text-left">
                    <h2 className="text-6xl font-semibold">Welcome to <span className='text-primary font-bold'>RecipePals</span></h2>
                    <p className='mt-4 font-light'>Discover, share, and create delicious recipes with friends and family.</p>
                    <p className='mt-5 font-light'>Join our community of food lovers today!</p>
                    <div className="mt-2 flex justify-center lg:justify-start items-center gap-5">
                        <Link className="block px-3 py-1 border bg-primary-foreground rounded hover:opacity-90 active:opacity-80" to={SIGNUP}>Sign Up</Link>
                        <Link className="block px-3 py-1 font-medium border bg-primary text-white rounded hover:opacity-90 active:opacity-80" to={LOGIN}>Login</Link>
                    </div>
                </div>
                <RotatingImages className='w-[50%] lg:w-[40%]' />
            </div>
        </>
    );
}

export default Home;
