import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getFlewaToken } from '../lib/api';

import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';

import ChatLoader from '../components/ChatLoader.jsx';
import CallButton from '../components/CallButton.jsx';

const FLEWA_API_KEY = import.meta.env.VITE_FLEWA_API_KEY;

const ChatPage = () => {
  const { chatId: targetUserId } = useParams();

  const [flewaClient, setFlewaClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["flewaToken"],
    queryFn: getFlewaToken,
    enabled: !!authUser // ceci ne sera exécuté que si authUser est disponible New Friend
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Lancement de la connexion au client StreamChat...");

        const client = StreamChat.getInstance(FLEWA_API_KEY);

        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture
        }, tokenData.token);

        //
        const channelId = [authUser._id, targetUserId].sort().join("-");

        /*
        vous et moi
        si je commence le chat => channelId : [myId, yourId]
        si vous commencez le chat => channelId : [yourId, myId]
        */

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setFlewaClient(client);
        setChannel(currChannel);

      } catch (error) {
        console.error("Erreur d'initialisation du chat:", error);
        toast.error("Impossible de se connecter au chat. Veuillez réessayer.");

      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `J'ai lancé une discussion en vidéo. Connectez-vous avec moi ici : ${callUrl}`,
      });

      toast.success("L'envoi du lien pour l'appel vidéo a été effectué avec succès !");
    }
  };

  if (loading || !flewaClient || !channel) return <ChatLoader />;


  return (
    <>
      <main className="h-[93vh]">
        <Chat client={flewaClient}>
          <Channel channel={channel}>
            <section className="w-full relative">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </section>
            <Thread />
          </Channel>
        </Chat>
      </main>
    </>
  )
}

export default ChatPage