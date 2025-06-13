import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { acceptDjavoueRequest, getDjavoueRequests } from '../lib/api';
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: djavoueRequests, isLoading } = useQuery({
    queryKey: ["djavouesRequests"],
    queryFn: getDjavoueRequests,
  });

  const { mutate: acceptDjavoueRequestMutation, isPending } = useMutation({
    mutationFn: acceptDjavoueRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["djavouesRequests"] });
      queryClient.invalidateQueries({ queryKey: ["djavoues"] });
    },
  });

  const incomingRequests = djavoueRequests?.incomingReqs || [];
  const acceptedRequests = djavoueRequests?.acceptedReqs || [];

  return (
    <>
      <main className="p-4 sm:p-6 lg:p-8">
    <section className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

        {isLoading ? (
            <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        ) : (
            <>
                {incomingRequests.length > 0 && (
                    <article className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <UserCheckIcon className="h-5 w-5 text-primary" />
                              Demandes d'ami(e)s
                            <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                        </h2>

                        <div className="space-y-3">
                            {incomingRequests.map((request) => (
                                <div
                                    key={request._id}
                                    className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar w-14 h-14 rounded-full bg-base-300">
                                                    <img src={request.sender.profilePicture} alt={request.sender.fullName} />
                                                </div>
                                            </div>

                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => acceptDjavoueRequestMutation(request._id)}
                                                disabled={isPending}
                                            >
                                                Admettre
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                )}

                {/* NOTIFICATIONS DES DEMANDES ACCEPTES */}
                {acceptedRequests.length > 0 && (
                    <article className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <BellIcon className="h-5 w-5 text-success" />
                            Nouvelles relations
                        </h2>

                        <div className="space-y-3">
                            {acceptedRequests.map((notification) => (
                                <div key={notification._id} className="card bg-base-200 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="avatar mt-1 size-10 rounded-full">
                                                <img
                                                    src={notification.recipient.profilePicture}
                                                    alt={notification.recipient.fullName}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{notification.recipient.fullName}</h3>
                                                <p className="text-sm my-1">
                                                    Votre demande d'amitié a été approuvée par {notification.recipient.fullName}.
                                                </p>
                                                <p className="text-xs flex items-center opacity-70">
                                                    <ClockIcon className="h-3 w-3 mr-1" />
                                                    Récemment 
                                                </p>
                                            </div>
                                            <div className="badge badge-success">
                                                <MessageSquareIcon className="h-3 w-3 mr-1" />
                                                Nouvelle relation
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                )}

                {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
                    <NoNotificationsFound />
                )}
            </>
        )}
    </section>
</main>
    </>
  )
}

export default NotificationsPage; 