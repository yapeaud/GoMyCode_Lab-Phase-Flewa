import { LoaderIcon } from "lucide-react"

const ChatLoader = () => {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center p-4">
                <LoaderIcon className="animate-spin size-10 text-primary" />
                <p className="mt-4 text-center text-lg font-mono">Accés au chat en cours..;</p>
            </div>
        </>
    )
}

export default ChatLoader 
