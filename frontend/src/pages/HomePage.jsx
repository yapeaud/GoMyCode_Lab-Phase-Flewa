import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getDjavoues, getRecommendedUsers, getOutgoingDjavoueReqs, sendDjavoueRequest } from "../lib/api";
import { Link } from "react-router";
import { UsersIcon, MapPinIcon, CheckCircleIcon, UserPlusIcon } from "lucide-react";
import DjavoueCard from "../components/DjavoueCard.jsx";
import NoDjavoueFound from "../components/NoDjavoueFound.jsx";



const HomePage = () => {
    const queryClient = useQueryClient();
    const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

    const { data: djavoues = [], isLoading: loadingDjavoues } = useQuery({
        queryKey: ["djavoues"],
        queryFn: getDjavoues,
    });

    const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
        queryKey: ["users"],
        queryFn: getRecommendedUsers,
    });

    const { data: outgoingDjavoueReqs } = useQuery({
        queryKey: ["outgoingDjavoueReqs"],
        queryFn: getOutgoingDjavoueReqs,
    });

    const { mutate: sendDjavoueRequestMutation, isPending } = useMutation({
        mutationFn: sendDjavoueRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingDjavoueReqs"] }),
    });

    useEffect(() => {
        const outgoingIds = new Set();
        if (outgoingDjavoueReqs && outgoingDjavoueReqs.length > 0) {
            outgoingDjavoueReqs.forEach((req) => {
                
                outgoingIds.add(req.recipient._id);
            });
            setOutgoingRequestsIds(outgoingIds);
        }                                                                                                                       
    }, [outgoingDjavoueReqs]);

    return (
        <>
            <main className="p-4 sm:p-6 lg:p-8">
                <section className="container mx-auto space-y-10">
                    {/* Section Mes Ami(e)s */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mes Ami(e)s</h2>
                        <Link to="/notifications" className="btn btn-outline btn-sm">
                            <UsersIcon className="mr-2 size-4" />
                            Demande d'ami(e)s
                        </Link>
                    </div>

                    {loadingDjavoues ? (
                        <div className="flex justify-center py-12">
                            <span className="loading loading-spinner loading-lg"></span>
                            Chargement...
                        </div>
                    ) : djavoues.length === 0 ? (
                        <NoDjavoueFound />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {djavoues.map((djavoue) => (
                                <DjavoueCard key={djavoue._id} djavoue={djavoue} />
                            ))}
                        </div>
                    )}

                    {/* Section Rencontres */}
                    <article>
                        <div className="mb-6 sm:mb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Rencontrez de nouvelles personnes.</h2>
                                    <p className="opacity-70">
                                        Partagez des moments inoubliables ensemble.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {loadingUsers ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : recommendedUsers.length === 0 ? (
                            <div className="card bg-base-200 p-6 text-center">
                                <h3 className="font-semibold text-lg mb-2">Aucune recommandation disponible</h3>
                                <p className="text-base-content opacity-70">
                                    Revenez plus tard pour de nouvelles recommandations.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendedUsers.map((user) => {
                                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                                    return (
                                        <div key={user._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                                            <div className="card-body p-5 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar size-16 rounded-full">
                                                        <img src={user.profilePicture} alt={user.fullName} />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold text-lg">{user.fullName}</h3>
                                                        {user.location && (
                                                            <div className="flex items-center text-xs opacity-70 mt-1">
                                                                <MapPinIcon className="size-3 mr-1" />
                                                                {user.location}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                                                <button
                                                    className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
                                                    onClick={() => sendDjavoueRequestMutation(user._id)}
                                                    disabled={hasRequestBeenSent || isPending}
                                                >
                                                    {hasRequestBeenSent ? (
                                                        <>
                                                            <CheckCircleIcon className="size-4 mr-2" />
                                                            Demande envoyée
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlusIcon className="size-4 mr-2" />
                                                            Envoyer une demande
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </article>
                </section>
            </main>

        </>
    )
}

export default HomePage