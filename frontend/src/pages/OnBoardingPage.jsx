import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api"; 
import toast from "react-hot-toast";
import { CameraIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, LoaderIcon} from "lucide-react";

const OnBoardingPage = () => { 
  const {authUser} = useAuthUser();
  const queryClient = useQueryClient();

  const [formaState, setFormaState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || "",
  });

  const {mutate:onboardingMutation, isPending} = useMutation({
    mutationFn:completeOnboarding,
    onSuccess: () => {
      toast.success("Profil mis à jour");
      queryClient.invalidateQueries({queryKey:["authUser"]});
    },
      onError: (error) => {
        toast.error(error.response.data.message);
      }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formaState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 Compris entre 1 et 100, y compris ces deux extrêmes.
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormaState({...formaState, profilePicture: randomAvatar});
    toast.success("Avatar modifié avec success");
  }
  
  return (
    <>
      <main className="flex justify-center items-center min-h-screen bg-base-100 p-4">
        <section className="card bg-base-200 w-full max-w-3xl shadow-xl">
          <article className="card-body p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">Achevez la complétion de votre profil.</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CONTENEUR DE LA PHOTO DE PROFIL */}
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* PHOTO DE PROFIL */}
                <div className="size-32 rounded-full overflow-hidden bg-base-300">
                  {
                    formaState.profilePicture ?(
                      <img 
                        src={formaState.profilePicture} 
                        alt="Photo de profil" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <CameraIcon className="size-12 text-base-content opacity-40" />
                      </div>
                    )
                  }
                </div>

                {/* BOUTON POUR CHOISIR UNE NOUVELLE PHOTO */}
                <div className="flex items-center gap-2">
                  <button type="button" className="btn btn-accent" onClick={handleRandomAvatar}>
                    <ShuffleIcon className="size-4 mr-2" />
                    Choisir un avatar
                  </button>
                </div>
              </div>

               {/* INPUT POUR LE NOM COMPLET */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Nom Complet</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formaState.fullName}
                    onChange={(e) => setFormaState({ ...formaState, fullName: e.target.value })}
                    placeholder="Votre nom complet"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* INPUT POUR LE BIO */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Bio</span>
                  </label>
                  <textarea
                    type="text"
                    name="bio"
                    value={formaState.bio}
                    onChange={(e) => setFormaState({ ...formaState, bio: e.target.value })}
                    placeholder="Votre bio"
                    className="textarea textarea-bordered h-24"
                  />
                </div>

                {/* INPUT POUR LA LOCALISATION */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Localisation</span>
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                    <input
                    type="text"
                    name="location"
                    value={formaState.location}
                    onChange={(e) => setFormaState({ ...formaState, location: e.target.value })}
                    placeholder="Ville, Pays"
                    className="input input-bordered w-full pl-10"
                  />
                  </div>
                </div>

                {/* BOUTON D'ENVOI */}
                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                  {!isPending ? (
                    <>
                      <ShipWheelIcon className="size-5 mr-2" />
                      Compléter le profil
                    </>
                  ) : (
                    <>
                      <LoaderIcon className="animate-spin size-5 mr-2" />
                        Chargement...
                    </>
                  ) }
                </button>
            </form>
          </article> 
        </section>
      </main>
    </>
  )
}

export default OnBoardingPage