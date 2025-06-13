import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import logoFlewa from '../assets/img/flewa.png';
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";


const Sidebar = () => {
    const {authUser} = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    

    return (
        <>
            <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
                <div className="p-5 border-b border-base-300">
                    <Link to="/" className="flex items-center gap-2.5">
                        <img src={logoFlewa} alt="Logo de Flêwa" className="w-16 h-16" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">FLÊWA</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link 
                        to="/" 
                        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
                    >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span>Accueil</span>
                    </Link>

                    <Link 
                        to="/djavoues" 
                        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/djavoue" ? "btn-active" : ""}`}
                    >
                        <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span>Mes ami(e)s</span>
                    </Link>
                    
                    <Link
                        to="/notifications"
                        className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
                    >
                        <BellIcon className="size-5 text-base-content opacity-70" />
                        <span>Notifications</span>
                    </Link>
                </nav>

                {/* PROFIL DE L'UTILISATEUR */}
                <section className="p-4 mt-auto  border-t border-base-300">
                    <article className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={authUser?.profilePicture} alt="" />
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="font-semibold text-sm">{authUser?.fullName}</p>
                            <p className="text-xs text-success flex items-center gap-1">
                                <span className="size-2 rounded-full bg-success inline-block"></span>
                                <span>En ligne</span>
                            </p>
                        </div>
                    </article>
                </section>
            </aside>
        </>
    )
}

export default Sidebar;