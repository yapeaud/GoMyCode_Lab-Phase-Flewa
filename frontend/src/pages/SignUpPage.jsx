import { useState } from 'react'
import logoFlewa from '../assets/img/flewa.png'
import imgFlewa from '../assets/img/LogoFlewa.png'
import { Link } from 'react-router'

import useSignUp from '../hooks/useSignUp'

const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "", 
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation(signupData);
  };
  return ( 
    <>
      <section className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
        <article className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* FORMULAIRE COTE GAUCHE */}
        <aside className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <img src={logoFlewa} alt="Logo de Flêwa" className='w-16 h-16' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>FLÊWA</span>
          </div>

          {/* MESSAGE D'ERREUR */}
          {error && (
            <div className='alert alert-error mb-4-'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* FORMULAIRE */} 
          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-medium '>Créer un compte</h2>
                  <p>Rejoignez Flêwa et partagez des moments inoubliables.</p>
                </div>

                <div className='space-y-3'> 

                  {/* NOM COMPLET */}
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Nom complet</span>   
                    </label>
                    <input 
                      type="text"
                      placeholder="John Doe" 
                      className="input input-bordered w-full"
                      value={signupData.fullName} 
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Email</span>   
                    </label>
                    <input 
                      type="email"
                      placeholder="xNt8e@example.com"
                      className="input input-bordered w-full"
                      value={signupData.email} 
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>    

                  {/* MOT DE PASSE */}
                  <div className='form-control w-full'>
                    <label className="label">
                      <span className="label-text">Mot de passe</span>   
                    </label>
                    <input 
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signupData.password} 
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                    <p>Mot de passe doit avoir 6 caractères minimum</p>
                  </div>
                  <div>
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">J'accepte les{' '}
                        <span className='text-primary hover:underline'>conditions de service</span> et la{' '}
                        <span className='text-primary hover:underline'>politique de confidentialité</span>
                      </span>
                    </label>
                  </div> 
                </div>

                <button type='submit' className='btn btn-primary w-full'>
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Chargement...
                    </>
                  ) : (
                    "Créer un compte"
                  )}
                </button> 

                <div className='text-center mt-4'>
                  <p>Vous avez deja un compte ? {' '}
                  <Link to="/login" className='text-primary hover:underline'>Se connecter</Link></p>
                </div>
              </div>    
            </form>
          </div>
        </aside>
        
        {/* FORMULAIRE COTE DROITE */}
        <aside className='hidden lg:flex w-full lg:w-1/2 bg-primary/50 items-center justify-center'>
          <div className='max-w-md p-8'>
            {/* Image */}
            <div className='relative aspect-square max-w-sm mx-auto flex items-center justify-center'>
              <img src={imgFlewa} alt="Logo de Flêwa" className='w-40 h-40' />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Se connecter pour rejoindre Flêwa.</h2>
              <p className='opacity-70'>Pratiquez des conversations, faites-vous des amis et partagez des moments inoubliables.</p>
            </div>
          </div>
        </aside>
        </article>
      </section>
    </>
  )
}

export default SignUpPage