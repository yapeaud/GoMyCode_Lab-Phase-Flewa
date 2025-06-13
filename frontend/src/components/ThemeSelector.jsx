import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constants";

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();
    
    return (
        <>
            <section className="dropdown dropdown-end">

                {/* DÉCLENCHEUR DE LISTE DÉROULANTE */}
                <button tabIndex={0} className="btn btn-ghost btn-circle">
                    <PaletteIcon className="size-5" />
                </button>

                {/* CONTENU DE LA LISTE DÉROULANTE */}
                <article tabIndex={0} className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto">
                    <div className="space-y-1">
                        {THEMES.map((themeOption) => (
                            <button key={themeOption.name} 
                            className={`w-full px-4 py-3 rounded-xl flex itesms-center gap-3 transition-colors ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"} `}
                            onClick={() => setTheme(themeOption.name)}
                    >
                                <PaletteIcon className="size-4" />
                                <span className="font-medium">{themeOption.label}</span>

                                {/* COULEUR DU THEME */}
                                <div className="ml-auto flex gap-1">
                                    {themeOption.colors.map((color, idx) => (
                                        <span key={idx} style={{ backgroundColor: color }} className="size-2 rounded-full"></span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </article>
            </section>
        </>
    )
}

export default ThemeSelector