import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = ({children, showSidebar=false}) => {
    return (
        <>
            <section className="min-h-screen">
                <article className="flex">
                    {showSidebar && <Sidebar />}

                    <div className="flex-1 flex flex-col">
                        <Navbar />

                        <main className="flex-1 oveerflow-y-auto">{children}</main>
                    </div>
                </article>
            </section>
        </>    
    )
}

export default Layout