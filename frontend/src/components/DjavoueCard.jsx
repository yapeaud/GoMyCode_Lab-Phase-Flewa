import { Link } from 'react-router'

const DjavoueCard = ({ djavoue }) => {
    return (
        <>
            <section className='card bg-base-200 hover:shadow-md transition-shadow'>
                <article className='card-body'>
                    {/* INFOS DE L'AMI */}
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='avatar size-12'>
                            <img src={djavoue.profilePicture} alt={djavoue.fullName} />
                        </div>
                        <h3 className='font-semibold truncate'>{djavoue.fullName}</h3>
                    </div>

                    {/* BOUTON DE REQUETE */}
                    <Link to={`/chat/${djavoue._id}`} className='btn btn-primary w-full'>
                        Envoyer un message
                    </Link>
                </article>
            </section>
        </>
    )
}

export default DjavoueCard