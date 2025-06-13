import useAuthUser from "../hooks/useAuthUser";
import {Link, useLocation } from "react-router";
import useLogout from "../hooks/useLogout";
import logoFlewa from '../assets/img/flewa.png'
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isFlewaPage = location.pathname?.startsWith("/chat");

const {logoutMutation} = useLogout();

    return (
        <>
            <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="flex items-center justify-end w-full">
                        {/*  LOGO - UNIQUEMENT SUR LA PAGE DE CHAT */}
                        {isFlewaPage && (
                            <div className="pl-5">
                                <Link to="/" className="flex items-center gap-2.5">
                                <img src={logoFlewa} alt="Logo de Flêwa" className="w-8 h-8" />
                                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">FLÊWA</span>
                                </Link>
                            </div>
                        )}

                        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                            <Link to={"/notifications"}>
                                <button className=" btn btn-ghost btn-circle">
                                    <BellIcon className="w-6 h-6 text-base-content opacity-70" />
                                </button>
                            </Link>
                        </div>

                        {/* Todo: Theme Selector */}
                        <ThemeSelector /> 

                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <img src={authUser?.profilePicture} alt="Avatar de l'utilisateur" rel="noreferrer" />
                            </div>
                        </div>

                        {/* LOGOUT */}
                        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                            <LogOutIcon className="w-6 h-6 text-base-content opacity-70" />
                        </button>
                    </article>
                </section>
            </nav>
        </>
    )
}

export default Navbar