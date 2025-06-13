import logoFlewa from "../assets/img/flewa.png";
import imgFlewa from '../assets/img/LogoFlewa.png'
import { useState } from "react";

import useLogin  from "../hooks/useLogin";
import { Link } from "react-router";

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const {isPending, error, loginMutation} = useLogin();

    const handleLogin = (e) => {
        e.preventDefault()
        loginMutation(loginData);
    };

    return (
        <>
            <main className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">

                <section className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                    {/* FORMULAIRE DE CONNEXION */}
                    <article className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
                        {/* LOGO */}
                        <div className='mb-4 flex items-center justify-start gap-2'>
                            <img src={logoFlewa} alt="Logo de Flêwa" className='w-16 h-16' />
                            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>FLÊWA</span>
                        </div>

                        {/* MESSAGE D'ERREUR */}
                        {error && (
                            <div className="alert alert-error">
                                <span>{error.response.data.message}</span>
                            </div>
                        )}

                        <div className="w-full">
                            <form onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">Bienvenue sur Flêwa</h2>
                                        <p className="text-sm opacity-70">Connectez-vous pour continuer l'aventure sur Flêwa</p>
                                    </div>
                                </div>

                                {/* FORMULAIRE DE CONNEXION */}
                                <div className="flex flex-col gap-3">
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="hello@example.com"
                                            className="input input-bordered w-full"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Mot de passe</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="input input-bordered w-full"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                                        {isPending ? (
                                            <>
                                                <span className="loading loading-spinner loading-xs"></span>
                                                Connexion en cours...
                                            </>
                                        ) : (
                                            "Se connecter"
                                        )}
                                    </button>

                                    <div className="text-center mt-4">
                                        <p className="text-sm">
                                            Pas encore inscrit ?{" "}
                                            <Link to="/signup" className="text-primary hover:underline">S'inscrire</Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </article>

                    {/* IMAGE DE FOND */}
                    <article className="hidden lg:flex w-full lg:w-1/2 bg-primary/50 items-center justify-center">
                        <div className='max-w-md p-8'>
                            {/* Image */}
                            <div className='relative aspect-square max-w-sm mx-auto flex items-center justify-center'>
                                <img src={imgFlewa} alt="Logo de Flêwa" className='w-40 h-40' />
                            </div>
                            <div className='text-center space-y-3 mt-6'>
                                <h2 className='text-xl font-semibold'>Se relier à l'ensemble du globe.</h2>
                                <p className='opacity-70'>Discutez avec les autres, formez des amitiés, partagez des moments inoubliables.</p>
                            </div>
                        </div>
                    </article>


                </section>

            </main>
        </>
    )
}

export default LoginPage