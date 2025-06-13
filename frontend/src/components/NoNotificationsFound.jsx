import { BellIcon } from "lucide-react";
    
const NoNotificationsFound = () => {
    return (
        <>
            <section className="flex flex-col items-center justify-center py-16 text-center">
                <article className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
                    <BellIcon className="size-8 text-base-content opacity-40" />
                </article>
                <h3 className="text-lg font-semibold mb-2">Acune notification pour le moment</h3>
                <p className="text-base-content opacity-70 max-w-md">
                    Lorsque vous recevez des sollicitations de la part d'amis ou des messages, ceux-ci s'affichent ici.
                </p>
            </section>
        </>
    )
}

export default NoNotificationsFound