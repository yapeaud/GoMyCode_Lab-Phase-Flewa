import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {

    const authUser = useQuery({
        queryKey: ['authUser'],
        queryFn: getAuthUser,
        retry: false // verifier si l'utilisateur est connecté
    });

    return {isLoading:authUser.isLoading, authUser: authUser.data?.user }

}

export default useAuthUser