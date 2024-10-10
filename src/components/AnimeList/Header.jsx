import { Play } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

const Header = ({title, linkHref, linkTitle}) => {
    return (
        <div className="flex items-center justify-between p-4 mt-10">
            <div className="flex items-center">
                <Play size={28} weight="fill" className="mr-2 text-color-secondary"/>
                <h1 className="text-2xl font-bold text-color-primary">{title}</h1>
            </div>
            { linkHref && linkTitle ? 
                <Link href={linkHref} className="transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-blue focus:outline-non 
                                                rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary">
                    {linkTitle}
                    {/* <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    </span>          */}
                </Link>
                : null
            }
        </div>
    )
}

export default Header