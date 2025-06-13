import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getFlewaToken } from "../lib/api";

import { StreamVideo, StreamVideoClient, StreamCall, CallControls, SpeakerLayout, StreamTheme, CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const FLEWA_API_KEY = import.meta.env.VITE_FLEWA_API_KEY;

const CallPage = () => {
  const { callId: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["flewaToken"],
    queryFn: getFlewaToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initialisation du client vidéo Stream...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        };

        const videoClient = new StreamVideoClient({
          apiKey: FLEWA_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        console.log("Joinde au appel Stream...");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
          console.error("Erreur de connexion à l'appel :", error);
          toast.error("Impossible de rejoindre l'appel. Veuillez réessayer.");
      } finally {
        setIsConnecting(false);
      }
    }
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;
  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center">
        <article className="relative">
          {client && call ? (
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <CallContent />
              </StreamCall>
            </StreamVideo>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Impossible d'initialiser l'appel. Veuillez actualiser ou réessayer plus tard</p>
            </div>
          )}
        </article>
      </section>
    </>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};


export default CallPage