import { Menu } from "./Navbar"

interface LayoutProps {
    children:JSX.Element;
    title:string;

}

export const Layout = ({children,title}:LayoutProps) =>{
    return(
        <div>
            <Menu title={title} />
            {children}
        </div>
    )
}

